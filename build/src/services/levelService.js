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
const level_1 = __importDefault(require("../models/level"));
const get_level = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield level_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_level = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const levelBuilded = level_1.default.build(data);
    const resultValidate = yield levelBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const levelCreated = yield levelBuilded
        .save()
        .catch((err) => ({ err }));
    if (levelCreated.err)
        res.status(409).json(levelCreated.err.errors);
    res.status(200).json(levelCreated);
});
const get_level_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const level = yield level_1.default.findByPk(id);
        if (!level)
            return res.status(404).json("level not found");
        return res.status(200).json(level);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_level_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield level_1.default.findByPk(id);
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
exports.default = {
    get_level_by_id,
    put_level_by_id,
    get_level,
    post_level,
};
//# sourceMappingURL=levelService.js.map