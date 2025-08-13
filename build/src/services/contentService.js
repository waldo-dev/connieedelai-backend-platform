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
exports.delete_content_by_id = exports.generate_upload_url = exports.post_content_with_upload = void 0;
const content_1 = require("../models/content");
const models_1 = require("../models");
const mime_types_1 = __importDefault(require("mime-types"));
const wasabiService_1 = require("./wasabiService");
const uuid_1 = require("uuid");
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función
const storage_1 = require("@google-cloud/storage");
const connieedelai_c1edf_466220_3e8259af3da0_json_1 = __importDefault(require("../config/connieedelai-c1edf-466220-3e8259af3da0.json"));
const storage = new storage_1.Storage({
    projectId: connieedelai_c1edf_466220_3e8259af3da0_json_1.default.project_id,
    credentials: connieedelai_c1edf_466220_3e8259af3da0_json_1.default,
});
const bucketName = "connieedelai-c1edf-466220.firebasestorage.app";
const bucket = storage.bucket(bucketName);
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
        console.log("🚀 ~ content:", content);
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
            return res
                .status(404)
                .json({ message: "Contenido no encontrado en entrenamientos" });
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
            return res
                .status(404)
                .json({ message: "Contenido no encontrado en entrenamientos" });
        }
        return res.status(200).json(section);
    }
    catch (err) {
        console.error("Error al obtener contenidos de entrenamiento:", err);
        return res.status(500).json({ message: "Error al obtener entrenamientos" });
    }
});
const put_content_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dataPut = req.body;
        // Buscar el contenido en la base de datos
        const objectDB = yield content_1.Content.findByPk(id);
        if (!objectDB) {
            return res.status(404).json({ message: "Contenido no encontrado" });
        }
        // Inicializamos valores que se pueden actualizar
        let updatedFields = Object.assign({}, dataPut);
        // Procesar archivos si vienen
        const files = req.files;
        if (files) {
            // Si viene imagen de vista previa
            if (files.prev_url && files.prev_url.length > 0) {
                const imageFile = files.prev_url[0];
                if (!imageFile.mimetype.startsWith("image/")) {
                    return res.status(400).json({ message: "La vista previa debe ser una imagen" });
                }
                const imageExtension = mime_types_1.default.extension(imageFile.mimetype);
                const imageUniqueName = `${(0, uuid_1.v4)()}.${imageExtension}`;
                const imagePathInStorage = `contents/images/${imageUniqueName}`;
                const imageUrl = yield (0, wasabiService_1.uploadFileToFirebase)(imagePathInStorage, imageFile.buffer, imageFile.mimetype);
                updatedFields.prev_url = imageUrl;
            }
            // Si viene archivo principal (video o PDF)
            if (files.file && files.file.length > 0) {
                const mainFile = files.file[0];
                const fileExtension = mime_types_1.default.extension(mainFile.mimetype);
                const uniqueName = `${(0, uuid_1.v4)()}.${fileExtension}`;
                const folder = mainFile.mimetype === "application/pdf" ? "pdf" : "video";
                const filePathInStorage = `contents/${folder}/${uniqueName}`;
                const fileUrl = yield (0, wasabiService_1.uploadFileToFirebase)(filePathInStorage, mainFile.buffer, mainFile.mimetype);
                updatedFields.url = fileUrl;
            }
        }
        // Actualizar registro
        const updatedObject = yield objectDB.update(updatedFields);
        return res.status(200).json(updatedObject);
    }
    catch (err) {
        console.error("Error al actualizar contenido:", err);
        return res.status(500).json({ message: "Error interno al actualizar" });
    }
});
const post_content_with_upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type, is_downloadable, moduleId, file } = req.body;
        const files = req.files;
        // Validar que existe el archivo de vista previa (imagen)
        if (!files || !files.prev_url || files.prev_url.length === 0) {
            return res
                .status(400)
                .json({ message: "Se requiere la imagen de vista previa" });
        }
        // Extraer la imagen (prev_url)
        const imageFile = files.prev_url[0];
        // Validar que es imagen
        if (!imageFile.mimetype.startsWith("image/")) {
            return res
                .status(400)
                .json({ message: "El archivo de vista previa debe ser una imagen" });
        }
        // const videoOrPdfExtension = mime.extension(videoOrPdfFile.mimetype);
        // const videoOrPdfUniqueName = `${uuidv4()}.${videoOrPdfExtension}`;
        // const videoOrPdfPathInStorage = `contents/${
        //   type == "pdf" ? "pdf" : "video"
        // }/${videoOrPdfUniqueName}`;
        // const videoOrPdfUrl = await uploadFileToFirebase(
        //   videoOrPdfPathInStorage,
        //   videoOrPdfFile.buffer,
        //   videoOrPdfFile.mimetype
        // );
        // console.log(
        //   "🚀 ~ post_content_with_upload ~ videoOrPdfUrl:",
        //   videoOrPdfUrl
        // );
        const imageExtension = mime_types_1.default.extension(imageFile.mimetype);
        const imageUniqueName = `${(0, uuid_1.v4)()}.${imageExtension}`;
        const imagePathInStorage = `contents/images/${imageUniqueName}`;
        const imageUrl = yield (0, wasabiService_1.uploadFileToFirebase)(imagePathInStorage, imageFile.buffer, imageFile.mimetype);
        console.log("🚀 ~ post_content_with_upload ~ imageUrl:", imageUrl);
        const contentCreated = yield content_1.Content.create({
            title,
            description,
            type,
            is_downloadble: is_downloadable === "true",
            url: file,
            prev_url: imageUrl,
            visible: true,
        });
        // Relacionar con módulo
        yield models_1.ContentModule.create({
            content_id: contentCreated.id,
            module_id: moduleId,
        });
        return res.status(201).json(contentCreated);
    }
    catch (err) {
        console.error("Error al subir contenido:", err);
        return res.status(500).json({ message: "Error interno" });
    }
});
exports.post_content_with_upload = post_content_with_upload;
const generate_upload_url = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, contentType } = req.body;
        if (!filename || !contentType) {
            return res.status(400).json({ error: "Falta filename o contentType" });
        }
        const url = yield (0, wasabiService_1.generateUploadSignedUrl)(filename, contentType);
        res.json({ url });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generando URL" });
    }
});
exports.generate_upload_url = generate_upload_url;
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
            where: { content_id: contentId },
        });
        // Eliminar el contenido
        yield content.destroy();
        return res
            .status(200)
            .json({ message: "Contenido eliminado correctamente" });
    }
    catch (err) {
        console.error("Error al eliminar contenido:", err);
        return res
            .status(500)
            .json({ message: "Error interno al eliminar contenido" });
    }
});
exports.delete_content_by_id = delete_content_by_id;
exports.default = {
    get_content_by_id,
    put_content_by_id,
    generate_upload_url: exports.generate_upload_url,
    get_content,
    post_content,
    get_content_training,
    get_content_nutrition,
    get_content_training_by_id,
    get_content_nutrition_by_id,
    post_content_with_upload: exports.post_content_with_upload,
    delete_content_by_id: exports.delete_content_by_id,
};
//# sourceMappingURL=contentService.js.map