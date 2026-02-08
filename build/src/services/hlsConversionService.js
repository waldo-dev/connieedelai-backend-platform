"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVideoToHLS = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const storage_1 = require("@google-cloud/storage");
const connieedelai_c1edf_466220_3e8259af3da0_json_1 = __importDefault(require("../config/connieedelai-c1edf-466220-3e8259af3da0.json"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const storage = new storage_1.Storage({
    projectId: connieedelai_c1edf_466220_3e8259af3da0_json_1.default.project_id,
    credentials: connieedelai_c1edf_466220_3e8259af3da0_json_1.default,
});
const bucketName = "connieedelai-c1edf-466220.firebasestorage.app";
const bucket = storage.bucket(bucketName);
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(connieedelai_c1edf_466220_3e8259af3da0_json_1.default),
        storageBucket: bucketName,
    });
}
const adminBucket = firebase_admin_1.default.storage().bucket();
/**
 * Descarga un video desde una URL (puede ser Firebase Storage o cualquier URL)
 */
const downloadVideo = (videoUrl, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    // Si es una URL de Firebase Storage, intentar descargar directamente
    if (videoUrl.includes("storage.googleapis.com")) {
        try {
            // Extraer el path del archivo desde la URL
            const urlParts = videoUrl.split("/");
            const filePath = decodeURIComponent(urlParts.slice(4).join("/")); // Remover https://storage.googleapis.com/bucket-name/
            const file = bucket.file(filePath);
            const [exists] = yield file.exists();
            if (exists) {
                // Descargar directamente desde Firebase Storage
                yield file.download({ destination: outputPath });
                return;
            }
        }
        catch (err) {
            console.warn("No se pudo descargar desde Firebase Storage, intentando con HTTP:", err);
        }
    }
    // Fallback: descargar usando HTTP
    const response = yield (0, axios_1.default)({
        method: "GET",
        url: videoUrl,
        responseType: "stream",
    });
    const writer = fs_1.default.createWriteStream(outputPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
});
/**
 * Convierte un video a formato HLS
 */
const convertToHLS = (inputPath, outputDir, outputFileName) => {
    return new Promise((resolve, reject) => {
        const outputPath = path_1.default.join(outputDir, `${outputFileName}.m3u8`);
        (0, fluent_ffmpeg_1.default)(inputPath)
            .outputOptions([
            "-codec:v libx264",
            "-codec:a aac",
            "-hls_time 10",
            "-hls_list_size 0",
            "-hls_segment_filename",
            path_1.default.join(outputDir, "segment_%03d.ts"),
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
const uploadFileToFirebase = (key, filePath, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = bucket.file(key);
        yield bucket.upload(filePath, {
            destination: key,
            metadata: {
                contentType,
                cacheControl: "public,max-age=31536000",
            },
        });
        yield file.makePublic();
        return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(key)}`;
    }
    catch (err) {
        console.error("Error subiendo archivo a Firebase:", err);
        throw err;
    }
});
/**
 * Limpia archivos temporales
 */
const cleanupTempFiles = (dir) => {
    try {
        if (fs_1.default.existsSync(dir)) {
            const files = fs_1.default.readdirSync(dir);
            files.forEach((file) => {
                const filePath = path_1.default.join(dir, file);
                if (fs_1.default.statSync(filePath).isFile()) {
                    fs_1.default.unlinkSync(filePath);
                }
            });
            fs_1.default.rmdirSync(dir);
        }
    }
    catch (err) {
        console.error("Error limpiando archivos temporales:", err);
    }
};
/**
 * Convierte un video a HLS y lo sube a Firebase Storage
 * @param videoUrl URL del video original
 * @param contentId ID del contenido para organizar los archivos
 * @returns URL del archivo .m3u8
 */
const convertVideoToHLS = (videoUrl, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    // Usar process.cwd() para obtener el directorio raíz del proyecto
    const projectRoot = process.cwd();
    const tempDir = path_1.default.join(projectRoot, "temp", `hls_${contentId}_${(0, uuid_1.v4)()}`);
    // Detectar extensión del archivo original o usar .mp4 por defecto
    let originalExt = ".mp4";
    try {
        const urlPath = new URL(videoUrl).pathname;
        originalExt = path_1.default.extname(urlPath) || ".mp4";
    }
    catch (err) {
        // Si la URL no es válida, usar .mp4 por defecto
        console.warn("No se pudo parsear la URL, usando .mp4 por defecto");
    }
    const inputVideoPath = path_1.default.join(tempDir, `input_video${originalExt}`);
    let hlsOutputDir = path_1.default.join(tempDir, "hls_output");
    try {
        // Crear directorios temporales
        if (!fs_1.default.existsSync(tempDir)) {
            fs_1.default.mkdirSync(tempDir, { recursive: true });
        }
        if (!fs_1.default.existsSync(hlsOutputDir)) {
            fs_1.default.mkdirSync(hlsOutputDir, { recursive: true });
        }
        console.log(`📥 Descargando video desde: ${videoUrl}`);
        // Descargar el video
        yield downloadVideo(videoUrl, inputVideoPath);
        console.log(`🔄 Convirtiendo video a HLS...`);
        // Convertir a HLS
        const m3u8Path = yield convertToHLS(inputVideoPath, hlsOutputDir, "playlist");
        // Leer todos los archivos generados (segmentos .ts y .m3u8)
        const hlsFiles = fs_1.default.readdirSync(hlsOutputDir);
        console.log(`📤 Subiendo ${hlsFiles.length} archivos a Firebase Storage...`);
        // Subir todos los archivos HLS
        const uploadPromises = hlsFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const filePath = path_1.default.join(hlsOutputDir, file);
            const contentType = file.endsWith(".m3u8")
                ? "application/vnd.apple.mpegurl"
                : "video/mp2t";
            const storageKey = `contents/videos/${contentId}/hls/${file}`;
            return uploadFileToFirebase(storageKey, filePath, contentType);
        }));
        yield Promise.all(uploadPromises);
        // Obtener la URL del archivo .m3u8
        const m3u8Key = `contents/videos/${contentId}/hls/playlist.m3u8`;
        const m3u8Url = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(m3u8Key)}`;
        console.log(`✅ Conversión completada. URL HLS: ${m3u8Url}`);
        return m3u8Url;
    }
    catch (err) {
        console.error("❌ Error en convertVideoToHLS:", err);
        throw err;
    }
    finally {
        // Limpiar archivos temporales
        cleanupTempFiles(tempDir);
    }
});
exports.convertVideoToHLS = convertVideoToHLS;
//# sourceMappingURL=hlsConversionService.js.map