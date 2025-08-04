// src/middleware/upload.ts
import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5 GB si necesitas tanto
  },
});