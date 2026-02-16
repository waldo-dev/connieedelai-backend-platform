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

// Configurar la ruta de ffmpeg para fluent-ffmpeg si es necesario
const findFFmpegPath = (): string | null => {
  try {
    if (process.platform === "win32") {
      // Intentar con cmd /c where primero
      try {
        const result = execSync("cmd /c where ffmpeg", { encoding: "utf-8", stdio: "pipe" });
        const path = result.trim().split("\r\n")[0].trim();
        if (path && path.length > 0) return path;
      } catch (e) {
        // Si falla, intentar ejecutar ffmpeg directamente para obtener la ruta
        try {
          execSync("ffmpeg -version", { stdio: "ignore" });
          // Si funciona, fluent-ffmpeg debería encontrarlo automáticamente
          return null; // Dejar que fluent-ffmpeg lo encuentre
        } catch (e2) {
          return null;
        }
      }
    } else {
      const result = execSync("which ffmpeg", { encoding: "utf-8", stdio: "pipe" });
      return result.trim() || null;
    }
  } catch (error) {
    return null;
  }
  return null;
};

// Intentar encontrar y configurar ffmpeg
const ffmpegPath = findFFmpegPath();
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

// Verificar si ffmpeg está instalado
const checkFFmpeg = (): boolean => {
  try {
    // En Windows, usar cmd.exe para asegurar que use el PATH correcto
    if (process.platform === "win32") {
      execSync("cmd /c ffmpeg -version", { stdio: "ignore", timeout: 5000 });
    } else {
      execSync("ffmpeg -version", { stdio: "ignore", timeout: 5000 });
    }
    return true;
  } catch (error) {
    // Si falla, intentar sin cmd.exe como fallback
    try {
      execSync("ffmpeg -version", { stdio: "ignore", timeout: 5000 });
      return true;
    } catch (fallbackError) {
      return false;
    }
  }
};

// Verificar al cargar el módulo (solo advertencia, no bloquea)
if (!checkFFmpeg()) {
  console.warn("⚠️ ADVERTENCIA: No se pudo verificar ffmpeg en el PATH");
  console.warn("   fluent-ffmpeg intentará encontrarlo automáticamente cuando sea necesario");
  if (process.platform === "win32") {
    console.warn("\n📦 Si tienes problemas, asegúrate de que ffmpeg esté instalado:");
    console.warn("   winget install ffmpeg");
    console.warn("   Reinicia el servidor después de instalar\n");
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
    const outputPath = path.join(outputDir, `${outputFileName}.m3u8`);

    const ffmpegProcess = ffmpeg(inputPath)
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
        console.log("🎬 [FFmpeg] Comando ejecutado:", commandLine);
      })
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (err: any) => {
        console.error("❌ [FFmpeg] Error en conversión HLS:", err);
        
        // Verificar si el error es porque no se encuentra ffmpeg
        if (err.message && (
          err.message.includes("ffmpeg") && err.message.includes("not found") ||
          err.message.includes("ENOENT") ||
          err.message.includes("spawn ffmpeg")
        )) {
          reject(new Error("ffmpeg no está instalado o no está en el PATH del sistema. Por favor instala ffmpeg y agrégalo al PATH, luego reinicia el servidor."));
        } else {
          reject(err);
        }
      })
      .run();
  });
};

/**
 * Corrige el playlist.m3u8 reemplazando rutas relativas por URLs absolutas
 * @param m3u8Path Ruta local del archivo .m3u8
 * @param contentId ID del contenido para construir la URL base
 */
const fixM3U8Playlist = (m3u8Path: string, contentId: number): void => {
  try {
    // Leer el contenido del playlist
    const playlistContent = fs.readFileSync(m3u8Path, "utf-8");
    const lines = playlistContent.split("\n");
    
    // Path base en Firebase Storage
    const basePath = `contents/videos/${contentId}/hls`;
    const baseUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(basePath)}`;
    
    let segmentsFixed = 0;
    
    // Procesar cada línea
    const correctedLines = lines.map((line) => {
      const trimmedLine = line.trim();
      
      // Detectar líneas que referencian segmentos .ts
      // Formato M3U8: las líneas con segmentos pueden ser:
      // - segment_000.ts (directamente)
      // - ./segment_000.ts (ruta relativa)
      // - subdir/segment_000.ts (ruta relativa con subdirectorio)
      // NO tocar líneas que ya son URLs absolutas (http:// o https://)
      if (trimmedLine.endsWith(".ts") && !trimmedLine.startsWith("http")) {
        // Extraer solo el nombre del archivo (por si hay rutas relativas con subdirectorios)
        const segmentFileName = path.basename(trimmedLine);
        
        // Construir URL absoluta con encoding correcto
        const absoluteUrl = `${baseUrl}/${encodeURIComponent(segmentFileName)}`;
        
        // Preservar indentación/espacios de la línea original
        const prefix = line.substring(0, line.length - trimmedLine.length);
        segmentsFixed++;
        return prefix + absoluteUrl;
      }
      
      // Mantener todas las demás líneas sin cambios (comentarios, metadatos, etc.)
      return line;
    });
    
    // Escribir el contenido corregido
    const correctedContent = correctedLines.join("\n");
    fs.writeFileSync(m3u8Path, correctedContent, "utf-8");
    
    if (segmentsFixed > 0) {
      console.log(`✅ Playlist .m3u8 corregido: ${segmentsFixed} segmento(s) reemplazado(s) por URLs absolutas`);
    }
  } catch (error) {
    console.error("❌ Error corrigiendo playlist .m3u8:", error);
    throw error;
  }
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

    // Corregir el playlist.m3u8: reemplazar rutas relativas por URLs absolutas
    fixM3U8Playlist(m3u8Path, contentId);

    // Leer todos los archivos generados (segmentos .ts y .m3u8)
    const hlsFiles = fs.readdirSync(hlsOutputDir);

    // Separar el archivo .m3u8 de los segmentos
    const m3u8File = hlsFiles.find(file => file.endsWith(".m3u8"));
    const segmentFiles = hlsFiles.filter(file => !file.endsWith(".m3u8"));

    // Subir primero el archivo .m3u8 (más importante) - ya corregido con URLs absolutas
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

