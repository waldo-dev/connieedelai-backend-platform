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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const get_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Section.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const sectionBuilded = models_1.Section.build(data);
    const resultValidate = yield sectionBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const sectionCreated = yield sectionBuilded
        .save()
        .catch((err) => ({ err }));
    if (sectionCreated.err)
        res.status(409).json(sectionCreated.err.errors);
    res.status(200).json(sectionCreated);
});
const get_section_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const section = yield models_1.Section.findByPk(id);
        if (!section)
            return res.status(404).json("section not found");
        return res.status(200).json(section);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_section_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield models_1.Section.findByPk(id);
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
const get_contents_by_section_grouped_by_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionId = req.params.id;
        // Encuentra la sección e incluye sus módulos
        const section = yield models_1.Section.findByPk(sectionId, {
            include: [
                {
                    model: models_1.Module,
                    through: { attributes: [] },
                    include: [
                        {
                            model: models_1.Content,
                            through: { attributes: [] },
                        },
                    ],
                },
            ],
        });
        if (!section)
            return res.status(404).json({ message: "Section not found" });
        // Reorganiza los datos por módulo
        const result = section.dataValues;
        console.log("🚀 ~ result:", result);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error("Error al obtener contenidos agrupados por módulo:", err);
        return res.status(500).json({ message: "Error interno" });
    }
});
const get_modules_by_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionId = req.params.id;
        const section = yield models_1.Section.findByPk(sectionId, {
            include: [
                {
                    model: models_1.Module,
                    through: { attributes: [] },
                    include: [
                        {
                            model: models_1.Content,
                            through: { attributes: [] },
                        },
                    ],
                },
            ],
        });
        if (!section)
            return res.status(404).json({ message: "Section not found" });
        const modules = section.dataValues.modules;
        return res.status(200).json(modules);
    }
    catch (err) {
        console.error("Error al obtener módulos de la sección:", err);
        return res.status(500).json({ message: "Error interno" });
    }
});
exports.default = {
    get_section_by_id,
    put_section_by_id,
    get_section,
    post_section,
    get_contents_by_section_grouped_by_module,
    get_modules_by_section
};
//# sourceMappingURL=sectionService.js.map