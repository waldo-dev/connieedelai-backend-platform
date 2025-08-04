"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tempDir = path_1.default.join(__dirname, "..", "uploads");
if (!fs_1.default.existsSync(tempDir))
    fs_1.default.mkdirSync(tempDir);
// Multer config
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => cb(null, tempDir),
        filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024, // 5 GB
    },
});
//# sourceMappingURL=upload.js.map