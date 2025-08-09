import admin from "firebase-admin";
import { Readable } from "stream";
import path from "path";
import { v4 as uuidv4 } from "uuid";
// import serviceAccountJson from "../config/connieedelai-c1edf-firebase-adminsdk-fbsvc-ac47caa06a.json";
import serviceAccountJson from "../config/connieedelai-c1edf-466220-3e8259af3da0.json";
import { Storage } from "@google-cloud/storage";

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "connieedelai-c1edf-466220.firebasestorage.app",
  });
}

const bucket = admin.storage().bucket();

/**
 * Sube un archivo a Firebase Storage.
 * @param key Ruta y nombre del archivo en el bucket (ej. "videos/entreno1.mp4")
 * @param buffer Contenido del archivo (Buffer o Stream)
 * @param contentType Tipo de contenido (ej. "video/mp4" o "application/pdf")
 * @returns URL de descarga pública temporal
 */
export const uploadFileToFirebase = async (
  key: string,
  buffer: Buffer | Readable,
  contentType: string
): Promise<string> => {
  try {
  const file = bucket.file(key);
  const uuid = uuidv4();

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid,
    },
    contentType,
    cacheControl: "public,max-age=31536000",
  };

  await new Promise<void>((resolve, reject) => {
    const writeStream = file.createWriteStream({ metadata });
    console.log("🚀 ~ uploadFileToFirebase ~ writeStream:", writeStream)
    const input = buffer instanceof Readable ? buffer : Readable.from(buffer);
    console.log("🚀 ~ uploadFileToFirebase ~ input:", input)

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

  return `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURIComponent(key)}?alt=media&token=${uuid}`;
} catch (err){
   console.error("❌ Error en uploadFileToFirebase:", err);
    throw err;
}
};
