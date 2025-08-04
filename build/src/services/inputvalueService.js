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
const inputvalue_1 = __importDefault(require("../models/inputvalue"));
const get_input_value = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
    // attributes: { exclude: ["password"] },
    };
    const result = yield inputvalue_1.default.findAll(filter);
    if (!result)
        return res.status(500).json();
    else
        return res.status(200).json(result);
});
const post_input_value = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("🚀 ~ constpost_input_value= ~ data:", data);
    const objectBuilded = inputvalue_1.default.build(data);
    const resultValidate = yield objectBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    else {
        const objectCreated = yield objectBuilded
            .save()
            .catch((err) => ({ err }));
        if (objectCreated.err)
            res.status(409).json(objectCreated.err.errors);
        else
            res.status(201).json(objectCreated);
    }
});
const get_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    //   const filter:FindOptions = {where:{
    //   }}
    const object = yield inputvalue_1.default.findByPk(id);
    if (!object)
        return res.status(404).json("object not found");
    return res.status(200).json(object.toJSON());
});
const get_input_value_by_report_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inputvalue_1.default.findOne({
        where: {
            report_id: req.body.report_id,
            question_id: req.body.question_id
        }
    });
    if (!result)
        return res.status(200).json([]);
    else
        return res.status(200).json(result);
});
const get_input_value_by_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inputvalue_1.default.findAll({
        where: {
            report_id: req.params.id
        }
    });
    if (!result)
        return res.status(500).json();
    else
        return res.status(200).json(result);
});
const put_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield inputvalue_1.default.findByPk(id);
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
const delete_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter: FindOptions = {
    //   attributes: { exclude: ["password"] },
    // };
    const id = req.params.id;
    const objectFounded = yield inputvalue_1.default.findByPk(id);
    if (!objectFounded)
        return res.status(404).json("object not found");
    else {
        const companyDeleted = yield objectFounded
            .destroy()
            .catch((err) => ({ err }));
        if (companyDeleted.err)
            return res.status(409).json(companyDeleted.err);
        else
            return res.status(200).json(objectFounded);
    }
});
exports.default = {
    get_input_value,
    post_input_value,
    get_input_value_by_id,
    put_input_value_by_id,
    delete_input_value_by_id,
    get_input_value_by_report_question,
    get_input_value_by_report
};
//# sourceMappingURL=inputvalueService.js.map