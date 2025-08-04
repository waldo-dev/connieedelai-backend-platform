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
const empadmin_1 = __importDefault(require("../models/empadmin"));
const get_emp_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield empadmin_1.default.findAll({
            where: {
                active: true
            }
        });
        if (!result)
            return res.status(500).json();
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const post_emp_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const objectBuilded = empadmin_1.default.build(data);
    const resultValidate = yield objectBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const objectCreated = yield objectBuilded
        .save()
        .catch((err) => ({ err }));
    if (objectCreated.err)
        res.status(409).json(objectCreated.err.errors);
    res.status(201).json(objectCreated.toJSON());
});
const get_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const object = yield empadmin_1.default.findByPk(id);
        if (!object)
            return res.status(404).json("object not found");
        return res.status(200).json(object.toJSON());
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dataPut = req.body;
        const objectDB = yield empadmin_1.default.findByPk(id);
        if (!objectDB)
            return res.status(404).json("object not found");
        const objectUpdated = yield objectDB
            .update(dataPut)
            .catch((err) => ({ err }));
        if (objectUpdated.err) {
            const { errors } = objectUpdated.err;
            return res.status(404).json(errors);
        }
        return res.status(200).json(objectUpdated);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const delete_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const objectFounded = yield empadmin_1.default.findByPk(id);
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
const post_emp_admin_by_nom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name } = req.body;
        name = name.trim().toUpperCase();
        const object = yield empadmin_1.default.findAll({
            where: {
                name: name.trim().toUpperCase(),
                active: true
            }
        });
        if (!object)
            return res.status(500).json();
        return res.status(200).json(object);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    get_emp_admin,
    post_emp_admin,
    get_emp_admin_by_id,
    put_emp_admin_by_id,
    delete_emp_admin_by_id,
    post_emp_admin_by_nom
};
//# sourceMappingURL=empadminService.js.map