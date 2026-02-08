import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";
import serviceAccountJson from "../config/connieedelai-c1edf-466220-3e8259af3da0.json";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  projectId: serviceAccountJson.project_id,
  credentials: serviceAccountJson,
});

const bucketName = "connieedelai-c1edf-466220.firebasestorage.app";
const bucket = storage.bucket(bucketName);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson as admin.ServiceAccount),
    storageBucket: bucketName,
  });
}

const adminBucket = admin.storage().bucket();

/**
 * Descarga un video desde una URL (puede ser Firebase Storage o cualquier URL)
 */
const downloadVideo = async (videoUrl: string, outputPath: string): Promise<void> => {
  // Si es una URL de Firebase Storage, intentar descargar directamente
  if (videoUrl.includes("storage.googleapis.com")) {
    try {
      // Extraer el path del archivo desde la URL
      const urlParts = videoUrl.split("/");
      const filePath = decodeURIComponent(urlParts.slice(4).join("/")); // Remover https://storage.googleapis.com/bucket-name/
      
      const file = bucket.file(filePath);
      const [exists] = await file.exists();
      
      if (exists) {
        // Descargar directamente desde Firebase Storage
        await file.download({ destination: outputPath });
        return;
      }
    } catch (err) {
      console.warn("No se pudo descargar desde Firebase Storage, intentando con HTTP:", err);
    }
  }

  // Fallback: descargar usando HTTP
  const response = await axios({
    method: "GET",
    url: videoUrl,
    responseType: "stream",
  });

  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

/**
 * Convierte un video a formato HLS
 */
const convertToHLS = (
  inputPath: string,
  outputDir: string,
  outputFileName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, `${outputFileName}.m3u8`);

    ffmpeg(inputPath)
      .outputOptions([
        "-codec:v libx264",
        "-codec:a aac",
        "-hls_time 10",
        "-hls_list_size 0",
        "-hls_segment_filename",
        path.join(outputDir, "segment_%03d.ts"),
        "-start_number 0",
        "-f hls",
      ])
      .videoCodec("libx264")
      .audioCodec("aac")
      .output(outputPath)
      .on("start", (commandLine) => {
        console.log("FFmpeg comando:", commandLine);
      })
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Progreso: ${Math.round(progress.percent)}%`);
        }
      })
      .on("end", () => {
        console.log("✅ Conversión HLS completada");
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error("Error en conversión HLS:", err);
        reject(err);
      })
      .run();
  });
};

/**
 * Sube un archivo a Firebase Storage
 */
const uploadFileToFirebase = async (
  key: string,
  filePath: string,
  contentType: string
): Promise<string> => {
  try {
    const file = bucket.file(key);
    await bucket.upload(filePath, {
      destination: key,
      metadata: {
        contentType,
        cacheControl: "public,max-age=31536000",
      },
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(key)}`;
  } catch (err) {
    console.error("Error subiendo archivo a Firebase:", err);
    throw err;
  }
};

/**
 * Limpia archivos temporales
 */
const cleanupTempFiles = (dir: string): void => {
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(dir);
    }
  } catch (err) {
    console.error("Error limpiando archivos temporales:", err);
  }
};

/**
 * Convierte un video a HLS y lo sube a Firebase Storage
 * @param videoUrl URL del video original
 * @param contentId ID del contenido para organizar los archivos
 * @returns URL del archivo .m3u8
 */
export const convertVideoToHLS = async (
  videoUrl: string,
  contentId: number
): Promise<string> => {
  // Usar process.cwd() para obtener el directorio raíz del proyecto
  const projectRoot = process.cwd();
  const tempDir = path.join(projectRoot, "temp", `hls_${contentId}_${uuidv4()}`);
  
  // Detectar extensión del archivo original o usar .mp4 por defecto
  let originalExt = ".mp4";
  try {
    const urlPath = new URL(videoUrl).pathname;
    originalExt = path.extname(urlPath) || ".mp4";
  } catch (err) {
    // Si la URL no es válida, usar .mp4 por defecto
    console.warn("No se pudo parsear la URL, usando .mp4 por defecto");
  }
  const inputVideoPath = path.join(tempDir, `input_video${originalExt}`);
  let hlsOutputDir = path.join(tempDir, "hls_output");

  try {
    // Crear directorios temporales
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    if (!fs.existsSync(hlsOutputDir)) {
      fs.mkdirSync(hlsOutputDir, { recursive: true });
    }

    console.log(`📥 Descargando video desde: ${videoUrl}`);
    // Descargar el video
    await downloadVideo(videoUrl, inputVideoPath);

    console.log(`🔄 Convirtiendo video a HLS...`);
    // Convertir a HLS
    const m3u8Path = await convertToHLS(inputVideoPath, hlsOutputDir, "playlist");

    // Leer todos los archivos generados (segmentos .ts y .m3u8)
    const hlsFiles = fs.readdirSync(hlsOutputDir);

    console.log(`📤 Subiendo ${hlsFiles.length} archivos a Firebase Storage...`);

    // Subir todos los archivos HLS
    const uploadPromises = hlsFiles.map(async (file) => {
      const filePath = path.join(hlsOutputDir, file);
      const contentType = file.endsWith(".m3u8")
        ? "application/vnd.apple.mpegurl"
        : "video/mp2t";
      const storageKey = `contents/videos/${contentId}/hls/${file}`;

      return uploadFileToFirebase(storageKey, filePath, contentType);
    });

    await Promise.all(uploadPromises);

    // Obtener la URL del archivo .m3u8
    const m3u8Key = `contents/videos/${contentId}/hls/playlist.m3u8`;
    const m3u8Url = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(
      m3u8Key
    )}`;

    console.log(`✅ Conversión completada. URL HLS: ${m3u8Url}`);

    return m3u8Url;
  } catch (err) {
    console.error("❌ Error en convertVideoToHLS:", err);
    throw err;
  } finally {
    // Limpiar archivos temporales
    cleanupTempFiles(tempDir);
  }
};

