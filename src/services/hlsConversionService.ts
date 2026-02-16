import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";
import serviceAccountJson from "../config/connieedelai-c1edf-466220-3e8259af3da0.json";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { execSync } from "child_process";

// Verificar si ffmpeg está instalado
const checkFFmpeg = (): boolean => {
  try {
    if (process.platform === "win32") {
      execSync("where ffmpeg", { stdio: "ignore" });
    } else {
      execSync("which ffmpeg", { stdio: "ignore" });
    }
    return true;
  } catch (error) {
    return false;
  }
};

// Verificar al cargar el módulo
if (!checkFFmpeg()) {
  console.error("❌ ERROR: ffmpeg no está instalado o no está en el PATH");
  if (process.platform === "win32") {
    console.error("\n📦 Para instalar ffmpeg en Windows:");
    console.error("   1. Descarga desde: https://ffmpeg.org/download.html");
    console.error("   2. O usa chocolatey: choco install ffmpeg");
    console.error("   3. O usa winget: winget install ffmpeg");
    console.error("\n   Asegúrate de agregar ffmpeg al PATH del sistema");
    console.error("   Reinicia la terminal después de instalar\n");
  } else {
    console.error("\n📦 Para instalar ffmpeg en Ubuntu/Debian:");
    console.error("   sudo apt update");
    console.error("   sudo apt install -y ffmpeg");
    console.error("\n📦 Para instalar ffmpeg en Alpine (Docker):");
    console.error("   apk add --no-cache ffmpeg\n");
  }
}

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
  const startTime = Date.now();
  let downloadedBytes = 0;
  let totalBytes = 0;

  // Si es una URL de Firebase Storage, intentar descargar directamente
  if (videoUrl.includes("storage.googleapis.com")) {
    try {
      // Extraer el path del archivo desde la URL
      const urlParts = videoUrl.split("/");
      const filePath = decodeURIComponent(urlParts.slice(4).join("/")); // Remover https://storage.googleapis.com/bucket-name/
      
      const file = bucket.file(filePath);
      const [exists] = await file.exists();
      
      if (exists) {
        // Obtener metadata para saber el tamaño
        const [metadata] = await file.getMetadata();
        totalBytes = parseInt(String(metadata.size || "0"), 10);
        
        // Descargar directamente desde Firebase Storage
        await file.download({ destination: outputPath });
        return;
      }
    } catch (err) {
      console.warn("⚠️ No se pudo descargar desde Firebase Storage, intentando con HTTP:", err);
    }
  }

  // Fallback: descargar usando HTTP
  const response = await axios({
    method: "GET",
    url: videoUrl,
    responseType: "stream",
  });

  // Obtener el tamaño total si está disponible
  totalBytes = parseInt(response.headers["content-length"] || "0", 10);

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
    // Verificar ffmpeg antes de usar
    if (!checkFFmpeg()) {
      reject(new Error("ffmpeg no está instalado. Por favor instala ffmpeg y agrégalo al PATH del sistema."));
      return;
    }

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
      .on("end", () => {
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
 * Sube un archivo a Firebase Storage con reintentos
 */
const uploadFileToFirebase = async (
  key: string,
  filePath: string,
  contentType: string,
  maxRetries: number = 3
): Promise<string> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const file = bucket.file(key);
      await bucket.upload(filePath, {
        destination: key,
        metadata: {
          contentType,
          cacheControl: "public,max-age=31536000",
        },
        timeout: 60000, // 60 segundos de timeout
      });

      await file.makePublic();

      return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(key)}`;
    } catch (err: any) {
      lastError = err;
      
      // Si es un error de timeout o conexión, reintentar
      if (attempt < maxRetries && (err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET' || err.code === 'ENOTFOUND')) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Backoff exponencial, max 10s
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // Si no es un error recuperable o es el último intento, lanzar error
      throw err;
    }
  }
  
  throw lastError;
};

/**
 * Limpia archivos temporales recursivamente
 */
const cleanupTempFiles = (dir: string): void => {
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Eliminar directorio recursivamente
          cleanupTempFiles(filePath);
        } else {
          // Eliminar archivo
          fs.unlinkSync(filePath);
        }
      });
      // Eliminar el directorio vacío
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

    // Descargar el video
    await downloadVideo(videoUrl, inputVideoPath);

    // Convertir a HLS
    const m3u8Path = await convertToHLS(inputVideoPath, hlsOutputDir, "playlist");

    // Leer todos los archivos generados (segmentos .ts y .m3u8)
    const hlsFiles = fs.readdirSync(hlsOutputDir);

    // Separar el archivo .m3u8 de los segmentos
    const m3u8File = hlsFiles.find(file => file.endsWith(".m3u8"));
    const segmentFiles = hlsFiles.filter(file => !file.endsWith(".m3u8"));

    // Subir primero el archivo .m3u8 (más importante)
    if (m3u8File) {
      const filePath = path.join(hlsOutputDir, m3u8File);
      const storageKey = `contents/videos/${contentId}/hls/${m3u8File}`;
      await uploadFileToFirebase(storageKey, filePath, "application/vnd.apple.mpegurl");
    }

    // Subir segmentos en lotes de 10 para evitar saturar la conexión
    const batchSize = 10;
    for (let i = 0; i < segmentFiles.length; i += batchSize) {
      const batch = segmentFiles.slice(i, i + batchSize);
      
      const uploadPromises = batch.map(async (file) => {
        const filePath = path.join(hlsOutputDir, file);
        const storageKey = `contents/videos/${contentId}/hls/${file}`;
        return uploadFileToFirebase(storageKey, filePath, "video/mp2t");
      });

      await Promise.all(uploadPromises);
      
      // Pequeño delay entre lotes para no saturar la conexión
      if (i + batchSize < segmentFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Obtener la URL del archivo .m3u8
    const m3u8Key = `contents/videos/${contentId}/hls/playlist.m3u8`;
    const m3u8Url = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(
      m3u8Key
    )}`;

    return m3u8Url;
  } catch (err) {
    console.error("❌ Error en convertVideoToHLS:", err);
    throw err;
  } finally {
    // Limpiar archivos temporales
    cleanupTempFiles(tempDir);
  }
};

