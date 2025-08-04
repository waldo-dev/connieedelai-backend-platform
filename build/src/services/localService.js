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
const local_1 = __importDefault(require("../models/local"));
const models_1 = require("../models");
const get_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        where: {
            active: true,
        },
        order: [["company_name", "ASC"]],
    };
    const result = yield local_1.default.findAll(filter);
    if (!result)
        return res.status(500).json();
    else
        return res.status(200).json(result);
});
const post_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const localData = {
        fantasy_name: req.body.fantasy_name,
        active: true,
        premium: false,
        address: req.body.address,
        company_name: req.body.company_name,
        rut: req.body.rut,
        num_auth_sani: req.body.num_auth_sani ? req.body.num_auth_sani : "",
        id_emp_admin: req.body.id_emp_admin,
        client_id: req.body.client_id,
    };
    const objectBuilded = local_1.default.build(localData);
    const resultValidate = yield objectBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors) {
        return res.status(409).json(resultValidate.errors);
    }
    const localCreated = yield objectBuilded
        .save()
        .catch((err) => ({ err }));
    if (localCreated.err)
        res.status(409).json(localCreated.err.errors);
    if (req.body.client_id) {
        const userLocal = {
            id_user: req.body.client_id,
            id_local: localCreated.id,
        };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ reason:", reason);
        });
    }
    if (req.body.supervisor_id) {
        let userLocal = { id_user: req.body.supervisor_id, id_local: localCreated.id };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ reason:", reason);
        });
    }
    if (req.body.auditor_id) {
        let userLocal = { id_user: req.body.auditor_id, id_local: localCreated.id };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ reason:", reason);
        });
    }
    return res.status(200).json(localCreated);
});
const get_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const object = yield local_1.default.findByPk(id);
    if (!object)
        return res.status(404).json("object not found");
    return res.status(200).json(object);
});
const put_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield local_1.default.findByPk(id);
    if (!objectDB)
        return res.status(404).json("object not found");
    const objectUpdated = yield objectDB
        .update(dataPut)
        .catch((err) => ({ err }));
    if (objectUpdated.err) {
        const { errors } = objectUpdated.err;
        return res.status(404).json(errors);
    }
    yield models_1.Userlocal.destroy({ where: { id_local: id } });
    if (dataPut.client_id) {
        let userLocal = {
            id_user: dataPut.client_id,
            id_local: id,
        };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
        });
    }
    if (dataPut.supervisor_id) {
        let userLocal = { id_user: dataPut.supervisor_id, id_local: id };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
        });
    }
    if (dataPut.auditor_id) {
        let userLocal = { id_user: dataPut.auditor_id, id_local: id };
        yield models_1.Userlocal.create(userLocal).catch((reason) => {
            console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
        });
    }
    return res.status(200).json(objectUpdated);
});
const delete_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter: FindOptions = {
    //   attributes: { exclude: ["password"] },
    // };
    const id = req.params.id;
    const objectFounded = yield local_1.default.findByPk(id);
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
const post_local_by_nom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fantasy_name } = req.body;
        fantasy_name = fantasy_name.trim().toUpperCase();
        const object = yield local_1.default.findAll({
            where: {
                fantasy_name: fantasy_name.trim().toUpperCase(),
                active: true,
            },
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
    get_local,
    post_local,
    get_local_by_id,
    put_local_by_id,
    delete_local_by_id,
    post_local_by_nom,
};
//# sourceMappingURL=localService.js.map