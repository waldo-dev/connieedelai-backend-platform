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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const mime_types_1 = __importDefault(require("mime-types"));
const wasabiService_1 = require("./wasabiService");
const uuid_1 = require("uuid");
const { Sequelize } = require("sequelize");
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función
const get_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Module.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moduleData = __rest(req.body, []);
        const file = req.file;
        // Validar si el archivo está presente
        if (!file) {
            return res.status(400).json({ message: "Falta archivo" });
        }
        // Obtener la extensión del archivo y crear un nombre único
        const extension = mime_types_1.default.extension(file.mimetype);
        const uniqueName = `${(0, uuid_1.v4)()}.${extension}`;
        const pathInWasabi = `images/${uniqueName}`;
        // Subir el archivo a Wasabi
        const uploadResult = yield (0, wasabiService_1.uploadFileToFirebase)(pathInWasabi, file.buffer, file.mimetype);
        // Obtener la URL de la imagen cargada
        const imageUrl = uploadResult;
        moduleData.prev_url = imageUrl;
        // Crear módulo
        const moduleBuilded = models_1.Module.build(moduleData);
        const resultValidate = yield moduleBuilded
            .validate()
            .catch((err) => err);
        if (resultValidate.errors)
            return res.status(409).json(resultValidate.errors);
        const moduleCreated = yield moduleBuilded
            .save()
            .catch((err) => ({ err }));
        if (moduleCreated.err)
            return res.status(409).json(moduleCreated.err.errors);
        // Vincular con sección si se especifica
        if (moduleData.section_id) {
            const section = yield models_1.Section.findByPk(moduleData.section_id);
            if (!section)
                return res.status(404).json({ message: "Sección no encontrada" });
            // Establecer relación en tabla intermedia
            yield moduleCreated.addSection(section); // usa Sequelize belongsToMany
        }
        return res.status(200).json(moduleCreated);
    }
    catch (error) {
        console.error("Error al crear módulo:", error);
        return res.status(500).json({ message: "Error al crear módulo" });
    }
});
const get_module_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const module = yield models_1.Module.findByPk(id, {
            include: [
                {
                    model: models_1.Content,
                    as: "contents", // debe coincidir con el alias `as` definido en la relación
                },
            ],
            order: [[{ model: models_1.Content, as: "contents" }, "createdAt", "ASC"]],
        });
        console.log("🚀 ~ get_module_by_id ~ module:", module);
        if (!module)
            return res.status(404).json("module not found");
        return res.status(200).json(module);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_module_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const image = req.file;
    if (image) {
        const extension = mime_types_1.default.extension(image.mimetype);
        const uniqueName = `${(0, uuid_1.v4)()}.${extension}`;
        const pathInWasabi = `images/${uniqueName}`;
        const uploadResult = yield (0, wasabiService_1.uploadFileToFirebase)(pathInWasabi, image.buffer, image.mimetype);
        const imageUrl = uploadResult;
        dataPut.prev_url = imageUrl;
    }
    const objectDB = yield models_1.Module.findByPk(id);
    if (!objectDB)
        return res.status(404).json("object not found");
    else {
        const objectUpdated = yield objectDB
            .update(dataPut)
            .catch((err) => ({ err }));
        if (objectUpdated.err) {
            const { errors } = objectUpdated.err;
            return res.status(404).json(errors);
        }
        else
            return res.status(200).json(objectUpdated);
    }
});
const get_module_with_contents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const module = yield models_1.Module.findByPk(id, {
            include: [
                {
                    model: models_1.Content,
                    as: "contents",
                },
            ],
            order: [[{ model: models_1.Content, as: "contents" }, "createdAt", "ASC"]],
        });
        console.log("🚀 ~ get_module_with_contents ~ module:", module === null || module === void 0 ? void 0 : module.dataValues.contents);
        if (!module)
            return res.status(404).json({ message: "Módulo no encontrado" });
        return res.status(200).json(module);
    }
    catch (error) {
        console.error("Error al obtener módulo con contenidos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
const get_modules_by_difficulty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const difficulty = req.params.difficulty;
        const module = yield models_1.Module.findAll({
            where: {
                difficulty: difficulty,
            },
            include: [
                {
                    model: models_1.Content,
                    as: "contents", // debe coincidir con el alias `as` definido en la relación
                },
            ],
        });
        if (!module)
            return res.status(404).json({ message: "Módulo no encontrado" });
        return res.status(200).json(module);
    }
    catch (error) {
        console.error("Error al obtener módulo con contenidos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
const delete_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const moduleId = parseInt(req.params.id);
    if (isNaN(moduleId)) {
        return res.status(400).json({ message: "Id inválido" });
    }
    const module = yield models_1.Module.findByPk(moduleId);
    if (!module) {
        return res.status(404).json({ message: "Contenido no encontrado" });
    }
    yield models_1.ContentModule.destroy({
        where: { module_id: moduleId },
    });
    yield module.destroy();
    return res.status(200).json({ message: "Contenido eliminado correctamente" });
});
exports.default = {
    get_module_by_id,
    put_module_by_id,
    get_module,
    post_module,
    get_module_with_contents,
    get_modules_by_difficulty,
    delete_module,
};
//# sourceMappingURL=moduleService.js.map