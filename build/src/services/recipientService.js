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
const recipient_1 = __importDefault(require("../models/recipient"));
const mailingService_1 = __importDefault(require("./mailingService"));
const post_recipient = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield recipient_1.default.findOne({
            where: {
                email
            }
        });
        if (isExist && isExist.dataValues)
            throw new Error("el usuario ya esta registrado");
        const recipientBuilded = recipient_1.default.build({ email });
        const resultValidate = yield recipientBuilded
            .validate()
            .catch((err) => err);
        if (resultValidate.errors)
            throw new Error("El usuario no se puede registrar");
        const recipientCreated = yield recipientBuilded
            .save()
            .catch((err) => ({ err }));
        if (recipientCreated.err)
            throw new Error("No se logro crear");
        const sendConfirmation = mailingService_1.default.send_confirm_subscription(email);
        return { recipientCreated, sendConfirmation };
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
const get_recipient_by_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipient = yield recipient_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (!recipient)
            throw new Error("El correo no esta registrado");
        return recipient;
    }
    catch (err) {
        console.error(err);
    }
});
const get_recipient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipient_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const get_recipient_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const recipient = yield recipient_1.default.findByPk(id);
        if (!recipient)
            return res.status(404).json("recipient not found");
        return res.status(200).json(recipient);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    get_recipient_by_id,
    get_recipient_by_email,
    get_recipient,
    post_recipient,
};
//# sourceMappingURL=recipientService.js.map