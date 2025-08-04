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
exports.delete_content_by_id = exports.post_content_with_upload = void 0;
const content_1 = require("../models/content");
const models_1 = require("../models");
const mime_types_1 = __importDefault(require("mime-types"));
const wasabiService_1 = require("./wasabiService");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función
const get_content = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_1.Content.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_content = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const contentBuilded = content_1.Content.build(data);
    const resultValidate = yield contentBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const contentCreated = yield contentBuilded
        .save()
        .catch((err) => ({ err }));
    if (contentCreated.err)
        res.status(409).json(contentCreated.err.errors);
    res.status(200).json(contentCreated);
});
const get_content_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("🚀 ~ id:", id);
        const content = yield content_1.Content.findByPk(id);
        // if (!content) return res.status(404).json("content not found");
        let url = "";
        // if(content.url){
        //   url = getWasabiFileUrl(content.url); 
        // }
        console.log("🚀 ~ content:", content);
        if (content) {
            content.url = url;
        }
        return res.status(200).json(content);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const get_content_training = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield models_1.Section.findAll({
            where: { id: 1 },
            include: [
                {
                    model: content_1.Content,
                    through: { attributes: [] },
                },
            ],
        });
        const allContents = sections.flatMap((section) => section.dataValues.contents);
        // Eliminar duplicados si un contenido está en múltiples secciones
        const uniqueContents = Array.from(new Map(allContents.map((c) => [c.id, c])).values());
        return res.status(200).json(uniqueContents);
    }
    catch (err) {
        console.error("Error al obtener contenidos de entrenamiento:", err);
        return res.status(500).json({ message: "Error al obtener entrenamientos" });
    }
});
const get_content_training_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = parseInt(req.params.id);
        if (isNaN(contentId))
            return res.status(400).json({ message: "ID inválido" });
        const section = yield models_1.Section.findOne({
            where: { id: 1 },
            include: [
                {
                    model: content_1.Content,
                    where: { id: contentId },
                    through: { attributes: [] },
                },
            ],
        });
        if (!section || !section.contents || section.contents.length === 0) {
            return res.status(404).json({ message: "Contenido no encontrado en entrenamientos" });
        }
        return res.status(200).json(section);
    }
    catch (err) {
        console.error("Error al obtener contenidos de entrenamiento:", err);
        return res.status(500).json({ message: "Error al obtener entrenamientos" });
    }
});
const get_content_nutrition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield models_1.Section.findAll({
            where: { id: 2 },
            include: [
                {
                    model: content_1.Content,
                    through: { attributes: [] },
                },
            ],
        });
        const allContents = sections.flatMap((section) => section.dataValues.contents);
        console.log("🚀 ~ allContents:", allContents);
        // Eliminar duplicados si un contenido está en múltiples secciones
        const uniqueContents = Array.from(new Map(allContents.map((c) => [c.id, c])).values());
        return res.status(200).json(uniqueContents);
    }
    catch (err) {
        console.error("Error al obtener contenidos de Nutricion:", err);
        return res.status(500).json({ message: "Error al obtener entrenamientos" });
    }
});
const get_content_nutrition_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = parseInt(req.params.id);
        if (isNaN(contentId))
            return res.status(400).json({ message: "ID inválido" });
        const section = yield models_1.Section.findOne({
            where: { id: 2 },
            include: [
                {
                    model: content_1.Content,
                    where: { id: contentId },
                    through: { attributes: [] },
                },
            ],
        });
        if (!section || !section.contents || section.contents.length === 0) {
            return res.status(404).json({ message: "Contenido no encontrado en entrenamientos" });
        }
        return res.status(200).json(section);
    }
    catch (err) {
        console.error("Error al obtener contenidos de entrenamiento:", err);
        return res.status(500).json({ message: "Error al obtener entrenamientos" });
    }
});
// const put_content_by_id = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//    const id = req.params.id;
//   const dataPut = req.body;
//   // Buscar el contenido en la base de datos
//   const objectDB = await Content.findByPk(id);
//   if (!objectDB) {
//     return res.status(404).json({ message: "Objeto no encontrado" });
//   }
//   // Validar si hay archivos para subir (podría ser uno o más archivos)
//   const files = req.files as Express.Multer.File[]; // Asegúrate de que req.files sea un array de archivos
//   // Si hay archivos, procesarlos
//   if (files && files.length > 0) {
//     // Inicializar URLs para los archivos
//     let videoOrPdfUrl: string | undefined;
//     let imageUrl: string | undefined;
//     // Separar archivos de video/PDF e imagen
//     const videoOrPdfFile = files.find(file => file.mimetype === 'application/pdf' || file.mimetype.startsWith('video/'));
//     const imageFile = files.find(file => file.mimetype.startsWith('image/'));
//     // Subida de archivo de video/PDF
//     if (videoOrPdfFile) {
//       const videoOrPdfExtension = mime.extension(videoOrPdfFile.mimetype);
//       const videoOrPdfUniqueName = `${uuidv4()}.${videoOrPdfExtension}`;
//       const videoOrPdfPathInWasabi = `contents/${videoOrPdfUniqueName}`;
//       const videoOrPdfFileStream = fs.createReadStream(videoOrPdfFile.path);
//       const videoOrPdfUploadResult = await uploadFileToFirebase(videoOrPdfPathInWasabi, videoOrPdfFileStream, videoOrPdfFile.mimetype);
//       fs.unlinkSync(videoOrPdfFile.path); // Limpiar archivo temporal
//       // videoOrPdfUrl = videoOrPdfUploadResult.Location;
//     }
//     // Subida de imagen
//     if (imageFile) {
//       const imageExtension = mime.extension(imageFile.mimetype);
//       const imageUniqueName = `${uuidv4()}.${imageExtension}`;
//       const imagePathInWasabi = `contents/images/${imageUniqueName}`;
//       const imageFileStream = fs.createReadStream(imageFile.path);
//       const imageUploadResult = await uploadFileToWasabi(imagePathInWasabi, imageFileStream, imageFile.mimetype);
//       fs.unlinkSync(imageFile.path); // Limpiar archivo temporal
//       imageUrl = imageUploadResult.Location;
//     }
//     // Actualizar el objeto en la base de datos, incluyendo nuevos URLs cuando están disponibles
//     const updatedData = {
//       ...dataPut,
//       ...(videoOrPdfUrl && { url: videoOrPdfUrl }), // Solo incluye url si existe
//       ...(imageUrl && { image_url: imageUrl }), // Solo incluye image_url si existe
//     };
//     const objectUpdated = await objectDB.update(updatedData).catch(err => {
//       return { err }; // Manejando el error
//     });
//     if ((objectUpdated as any).err) {
//       const { errors } = (objectUpdated as any).err;
//       return res.status(404).json(errors);
//     } else {
//       return res.status(200).json(objectUpdated);
//     }
//   } else {
//     // Si no hay archivos, simplemente actualiza el contenido existente
//     const objectUpdated = await objectDB.update(dataPut).catch(err => {
//       return { err }; // Manejando el error
//     });
//     if ((objectUpdated as any).err) {
//       const { errors } = (objectUpdated as any).err;
//       return res.status(404).json(errors);
//     } else {
//       return res.status(200).json(objectUpdated);
//     }
//   }
// };
const post_content_with_upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type, is_downloadable, moduleId } = req.body;
        const files = req.files;
        if (!files || !moduleId) {
            return res.status(400).json({ message: "Faltan archivos o moduleId" });
        }
        // Encontrar archivos según tipo
        const videoOrPdfFile = files.file.find((file) => file.mimetype === 'application/pdf' || file.mimetype.startsWith('video/'));
        const imageFile = files.prev_url.find((file) => file.mimetype.startsWith('image/'));
        if (!videoOrPdfFile
            || !imageFile) {
            return res.status(400).json({ message: "Se requieren un archivo de video/PDF y una imagen" });
        }
        const videoOrPdfExtension = mime_types_1.default.extension(videoOrPdfFile.mimetype);
        const videoOrPdfUniqueName = `${(0, uuid_1.v4)()}.${videoOrPdfExtension}`;
        const videoOrPdfPathInStorage = `contents/${type == "pdf" ? "pdf" : "video"}/${videoOrPdfUniqueName}`;
        const videoOrPdfStream = fs_1.default.createReadStream(videoOrPdfFile.path);
        const videoOrPdfUrl = yield (0, wasabiService_1.uploadFileToFirebase)(videoOrPdfPathInStorage, videoOrPdfStream, videoOrPdfFile.mimetype);
        console.log("🚀 ~ post_content_with_upload ~ videoOrPdfUrl:", videoOrPdfUrl);
        fs_1.default.unlinkSync(videoOrPdfFile.path);
        const imageExtension = mime_types_1.default.extension(imageFile.mimetype);
        const imageUniqueName = `${(0, uuid_1.v4)()}.${imageExtension}`;
        const imagePathInStorage = `contents/images/${imageUniqueName}`;
        const imageStream = fs_1.default.createReadStream(imageFile.path);
        const imageUrl = yield (0, wasabiService_1.uploadFileToFirebase)(imagePathInStorage, imageStream, imageFile.mimetype);
        fs_1.default.unlinkSync(imageFile.path); // Limpiar temporal
        // const contentCreated = await Content.create({
        //   title,
        //   description,
        //   type,
        //   is_downloadble: is_downloadable === "true",
        //   url: videoOrPdfUrl,
        //   prev_url: imageUrl,
        //   visible: true,
        // });
        // // Relacionar con módulo
        // await ContentModule.create({
        //   content_id: contentCreated.id,
        //   module_id: moduleId,
        // });
        return res.status(201).json(videoOrPdfUrl);
    }
    catch (err) {
        console.error("Error al subir contenido:", err);
        return res.status(500).json({ message: "Error interno" });
    }
});
exports.post_content_with_upload = post_content_with_upload;
const delete_content_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = parseInt(req.params.id);
        if (isNaN(contentId)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const content = yield content_1.Content.findByPk(contentId);
        if (!content) {
            return res.status(404).json({ message: "Contenido no encontrado" });
        }
        // Eliminar relaciones en ContentModule
        yield models_1.ContentModule.destroy({
            where: { content_id: contentId }
        });
        // Eliminar el contenido
        yield content.destroy();
        return res.status(200).json({ message: "Contenido eliminado correctamente" });
    }
    catch (err) {
        console.error("Error al eliminar contenido:", err);
        return res.status(500).json({ message: "Error interno al eliminar contenido" });
    }
});
exports.delete_content_by_id = delete_content_by_id;
exports.default = {
    get_content_by_id,
    // put_content_by_id,
    get_content,
    post_content,
    get_content_training,
    get_content_nutrition,
    get_content_training_by_id,
    get_content_nutrition_by_id,
    post_content_with_upload: exports.post_content_with_upload,
    delete_content_by_id: exports.delete_content_by_id
};
//# sourceMappingURL=contentService.js.map