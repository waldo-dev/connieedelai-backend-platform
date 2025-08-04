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
const userlocal_1 = require("../models/userlocal");
const models_1 = require("../models");
const get_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userlocal_1.Userlocal.findAll();
        if (!result)
            return res.status(500).json();
        else
            return res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const post_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const userBuilded = userlocal_1.Userlocal.build(data);
        const resultValidate = yield userBuilded
            .validate()
            .catch((err) => err);
        if (resultValidate.errors) {
            res.status(409).json(resultValidate.errors);
        }
        const userCreated = yield userBuilded.save().catch((err) => ({ err }));
        if (userCreated.err)
            res.status(409).json(userCreated.err.errors);
        return res.status(200).json(userCreated);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const get_user_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userlocal_1.Userlocal.findByPk(id);
        if (!user)
            return res.status(404).json("user not found");
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dataPut = req.body;
        const user = yield userlocal_1.Userlocal.findByPk(id);
        if (!user)
            return res.status(404).json("user not found");
        const userUpdated = yield user
            .update(dataPut)
            .catch((err) => ({ err }));
        if (userUpdated.err) {
            const { errors } = userUpdated.err;
            return res.status(404).json(errors);
        }
        return res.status(200).json(userUpdated);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const delete_user_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userFounded = yield userlocal_1.Userlocal.findByPk(id);
        if (!userFounded)
            return res.status(404).json("user not found");
        const companyDeleted = yield userFounded
            .destroy()
            .catch((err) => ({ err }));
        if (companyDeleted.err)
            return res.status(409).json(companyDeleted.err);
        return res.status(200).json(userFounded);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const get_local_by_userId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userFounded = yield userlocal_1.Userlocal.findAll({
            where: {
                id_user: id
            },
            include: {
                model: models_1.Local
            }
        });
        if (!userFounded)
            return res.status(404).json("user not found");
        return res.status(200).json(userFounded);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    get_user_local,
    post_user_local,
    get_user_local_by_id,
    put_user_local,
    delete_user_local_by_id,
    get_local_by_userId
};
//# sourceMappingURL=userlocalService.js.map