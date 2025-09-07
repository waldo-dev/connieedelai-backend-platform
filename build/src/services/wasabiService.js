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
exports.generateUploadSignedUrl = exports.uploadFileToFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const stream_1 = require("stream");
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
const uploadFileToFirebase = (key, buffer, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = bucket.file(key);
        const metadata = {
            contentType,
            cacheControl: "public,max-age=31536000",
        };
        yield new Promise((resolve, reject) => {
            const writeStream = file.createWriteStream({
                metadata,
            });
            writeStream.on("error", (err) => {
                console.error("🔥 Error escribiendo en Firebase Storage:", err);
                reject(err);
            });
            writeStream.on("finish", resolve);
            const input = buffer instanceof stream_1.Readable ? buffer : stream_1.Readable.from(buffer);
            input.pipe(writeStream);
        });
        // Hacer que el archivo sea completamente público
        yield file.makePublic();
        // Retornar URL pública (sirve para imágenes, videos, PDFs, etc.)
        return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(key)}`;
    }
    catch (err) {
        console.error("❌ Error en uploadFileToFirebase:", err);
        throw err;
    }
});
exports.uploadFileToFirebase = uploadFileToFirebase;
function generateUploadSignedUrl(key, contentType) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = bucket.file(key);
        const options = {
            version: "v4",
            action: "write",
            expires: Date.now() + 24 * 60 * 60 * 1000,
            contentType,
        };
        const [url] = yield file.getSignedUrl(options);
        return url;
    });
}
exports.generateUploadSignedUrl = generateUploadSignedUrl;
//# sourceMappingURL=wasabiService.js.map