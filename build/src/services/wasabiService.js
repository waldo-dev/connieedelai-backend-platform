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
exports.uploadFileToFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const stream_1 = require("stream");
const uuid_1 = require("uuid");
// import serviceAccountJson from "../config/connieedelai-c1edf-firebase-adminsdk-fbsvc-ac47caa06a.json";
const connieedelai_c1edf_466220_3e8259af3da0_json_1 = __importDefault(require("../config/connieedelai-c1edf-466220-3e8259af3da0.json"));
const serviceAccount = connieedelai_c1edf_466220_3e8259af3da0_json_1.default;
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        storageBucket: "connieedelai-c1edf-466220.firebasestorage.app",
    });
}
const bucket = firebase_admin_1.default.storage().bucket();
/**
 * Sube un archivo a Firebase Storage.
 * @param key Ruta y nombre del archivo en el bucket (ej. "videos/entreno1.mp4")
 * @param buffer Contenido del archivo (Buffer o Stream)
 * @param contentType Tipo de contenido (ej. "video/mp4" o "application/pdf")
 * @returns URL de descarga pública temporal
 */
const uploadFileToFirebase = (key, buffer, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = bucket.file(key);
        const uuid = (0, uuid_1.v4)();
        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: uuid,
            },
            contentType,
            cacheControl: "public,max-age=31536000",
        };
        yield new Promise((resolve, reject) => {
            const writeStream = file.createWriteStream({ metadata });
            console.log("🚀 ~ uploadFileToFirebase ~ writeStream:", writeStream);
            const input = buffer instanceof stream_1.Readable ? buffer : stream_1.Readable.from(buffer);
            console.log("🚀 ~ uploadFileToFirebase ~ input:", input);
            writeStream.on("error", (err) => {
                console.error("🔥 Error escribiendo en Firebase Storage:", err);
                reject(err);
            });
            writeStream.on("finish", () => {
                console.log("✅ Archivo subido correctamente:", key);
                resolve();
            });
            input.pipe(writeStream).on("error", reject).on("finish", resolve);
        });
        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(key)}?alt=media&token=${uuid}`;
    }
    catch (err) {
        console.error("❌ Error en uploadFileToFirebase:", err);
        throw err;
    }
});
exports.uploadFileToFirebase = uploadFileToFirebase;
//# sourceMappingURL=wasabiService.js.map