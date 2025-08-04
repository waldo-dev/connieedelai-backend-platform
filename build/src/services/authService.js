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
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = require("../utils/bcrypt");
const secretKey = process.env.JWT_SECRET_KEY;
// const recoveryPasswordKey = process.env.RECOVERY_PASSWORD_KEY as string;
const options = { algorithm: "HS256", expiresIn: "8h" };
const makePayload = (object, fields) => {
    const payload = fields.reduce((prev, value, index) => {
        const objValue = object[value];
        const newObj = Object.assign(Object.assign({}, prev), { [value]: objValue });
        return newObj;
    }, {});
    return payload;
};
const auth_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const filter = {
        attributes: { exclude: ["password"] },
    };
    try {
        const userFind = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (userFind) {
            const validatePass = (0, bcrypt_1.compareHash)(password, userFind.password);
            console.log("🚀 ~ constauth_login= ~ validatePass:", validatePass);
            const fields = ["id", "name", "email", "lastname", "active", "role", "plan"];
            if (validatePass) {
                const payload = makePayload(userFind, fields);
                const token = (0, jsonwebtoken_1.sign)(payload, secretKey);
                console.log("🚀 ~ constauth_login= ~ payload:", payload + " token: " + token);
                res.status(200).json({ user: payload, token: token });
            }
            else {
                res.status(400).json({ message: "Usuario/Contraseña Inválido" });
            }
        }
    }
    catch (err) {
        //console.log("🚀 ~ file: authService.ts:29 ~ constauth_login= ~ err:", err);
        res.status(400).json({ err });
    }
});
const auth_autorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(req.user);
});
exports.default = { auth_login, auth_autorization };
//# sourceMappingURL=authService.js.map