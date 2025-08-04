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
const question_1 = __importDefault(require("../models/question"));
const get_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const questionBuilded = question_1.default.build(data);
    const resultValidate = yield questionBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const question = yield questionBuilded
        .save()
        .catch((err) => ({ err }));
    if (question.err)
        res.status(409).json(question.err.errors);
    res.status(200).json(question);
});
const get_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const question = yield question_1.default.findByPk(id);
        if (!question)
            return res.status(404).json("rol not found");
        return res.status(200).json(question);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield question_1.default.findByPk(id);
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
const delete_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const objectFounded = yield question_1.default.findByPk(id);
    if (!objectFounded)
        return res.status(404).json("object not found");
    else {
        const questionDeleted = yield objectFounded
            .destroy()
            .catch((err) => ({ err }));
        if (questionDeleted.err)
            return res.status(409).json(questionDeleted.err);
        else
            return res.status(200).json(objectFounded);
    }
});
exports.default = {
    get_question_by_id,
    put_question_by_id,
    get_question,
    post_question,
    delete_question_by_id
};
//# sourceMappingURL=questionService.js.map