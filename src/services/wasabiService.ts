import admin from "firebase-admin";
import { Readable } from "stream";
// import serviceAccountJson from "../config/connieedelai-c1edf-firebase-adminsdk-fbsvc-ac47caa06a.json";
import serviceAccountJson from "../config/connieedelai-c1edf-466220-3e8259af3da0.json";
const serviceAccount = serviceAccountJson as admin.ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "connieedelai-c1edf-466220.firebasestorage.app",
  });
}

const bucket = admin.storage().bucket();

export const uploadFileToFirebase = async (
  key: string,
  buffer: Buffer | Readable,
  contentType: string
): Promise<string> => {
  try {
    const file = bucket.file(key);

    const metadata = {
      contentType,
      cacheControl: "public,max-age=31536000",
    };

    await new Promise<void>((resolve, reject) => {
      const writeStream = file.createWriteStream({ 
        metadata,
       });

      writeStream.on("error", (err) => {
        console.error("🔥 Error escribiendo en Firebase Storage:", err);
        reject(err);
      });

      writeStream.on("finish", resolve);

      const input = buffer instanceof Readable ? buffer : Readable.from(buffer);
      input.pipe(writeStream);
    });

    // Hacer que el archivo sea completamente público
    await file.makePublic();

    // Retornar URL pública (sirve para imágenes, videos, PDFs, etc.)
    return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(
      key
    )}`;
  } catch (err) {
    console.error("❌ Error en uploadFileToFirebase:", err);
    throw err;
  }
};

export async function generateUploadSignedUrl(key: string, contentType: string) {
  const file = bucket.file(key);

  const options = {
    version: "v4" as const,
    action: "write" as const,
    expires: Date.now() + 24 * 60 * 60 * 1000,
    contentType,
  };

  const [url] = await file.getSignedUrl(options);
  return url;
}
