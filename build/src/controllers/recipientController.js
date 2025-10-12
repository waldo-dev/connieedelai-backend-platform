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
const recipientService_1 = __importDefault(require("../services/recipientService"));
const get_recipient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipientService_1.default.get_recipient(req, res, next);
});
const get_recipient_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipientService_1.default.get_recipient_by_id(req, res, next);
});
const get_recipient_by_email = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const recipient = yield recipientService_1.default.get_recipient_by_email(email);
        return res.status(200).json(recipient);
    }
    catch (err) {
        console.error(err);
        return res.status(404).json({ error: err || "No se encontró el correo" });
    }
});
const post_recipient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const newRecipient = yield recipientService_1.default.post_recipient(email);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error(err);
        return res
            .status(404)
            .json({ error: err || "No se pudo agregar el correo" });
    }
});
exports.default = {
    get_recipient_by_id,
    get_recipient_by_email,
    get_recipient,
    post_recipient,
};
//# sourceMappingURL=recipientController.js.map