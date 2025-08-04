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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const bcrypt_2 = require("../utils/bcrypt");
require("dotenv").config();
const get_user_all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        attributes: { exclude: ["password"] },
        where: {
            active: true,
        },
    };
    const result = yield user_1.default.findAll(filter);
    if (!result)
        res.status(500).json();
    else
        res.status(200).json(result);
});
const generatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let respuesta = [];
    const cantidad = req.body;
    for (let index = 0; index < cantidad; index++) {
        const pass = Math.random().toString(36).slice(-8);
        const newHash = (0, bcrypt_2.generateHash)(pass);
        const secretKey = process.env.SECRET_CRYPTO;
        const ciphertext = crypto_js_1.default.AES.encrypt(pass, secretKey).toString();
        let item;
        item = { password: pass, hash: newHash, aes: ciphertext };
        respuesta.push(item);
    }
    return respuesta;
});
const post_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Verificar que venga la contraseña
        if (!data.password || data.password.trim().length === 0) {
            return res.status(400).json({ message: "Password requerida" });
        }
        // Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
        data.password = hashedPassword;
        data.active = true;
        const userBuilded = user_1.default.build(data);
        const resultValidate = yield userBuilded
            .validate()
            .catch((err) => err);
        if (resultValidate.errors)
            return res
                .status(400)
                .json(resultValidate.errors[0]);
        const userCreated = yield userBuilded.save().catch((err) => ({ err }));
        if (userCreated.err) {
            console.log("🚀 ~ userCreated.err:", userCreated.err);
            return res.status(409).json(userCreated.err.errors);
        }
        return res.status(201).json(userCreated);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const get_user_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            attributes: { exclude: ["password"] },
        };
        const { id } = req.params;
        const userFinded = yield user_1.default.findByPk(id, filter);
        if (!userFinded)
            res.status(500).json();
        return res.status(200).json(userFinded);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const get_user_by_rol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.params;
    const filter = {
        attributes: { exclude: ["password"] },
        where: {
            active: true,
            rol_id: id_rol,
        },
    };
    const result = yield user_1.default.findAll(filter);
    if (!result)
        res.status(500).json();
    else
        res.status(200).json(result);
});
const put_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Revisar
    try {
        const idUser = req.params.id;
        const dataPut = req.body;
        console.log("🚀 ~ constput_user= ~ dataPut:", dataPut);
        const user = yield user_1.default.findByPk(idUser);
        if (!user)
            return res.status(404).json("User not found");
        const userUpdated = yield user
            .update(dataPut)
            .catch((err) => ({ err }));
        if (userUpdated.err) {
            const { errors } = userUpdated.err;
            return res.status(404).json(errors);
        }
        return res.status(200).json(userUpdated);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const delete_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userFounded = yield user_1.default.findByPk(id);
        if (!userFounded)
            return res.status(404).json("User not found");
        const userDeleted = yield userFounded
            .update({ active: false })
            .catch((err) => ({ err }));
        if (userDeleted.err) {
            const { errors } = userDeleted.err;
            return res.status(404).json(errors);
        }
        return res.status(200).json(userDeleted);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const post_user_by_email = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        email = email.trim().toUpperCase();
        const object = yield user_1.default.findAll({
            where: {
                email: email.trim().toUpperCase(),
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
    get_user_all,
    post_user,
    get_user_by_id,
    put_user,
    delete_user,
    generatePassword,
    post_user_by_email,
    get_user_by_rol,
};
//# sourceMappingURL=userService.js.map