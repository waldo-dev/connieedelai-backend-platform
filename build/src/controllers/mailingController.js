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
const mailingService_1 = __importDefault(require("../services/mailingService"));
const send_select_plan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = req.body;
        const newRecipient = yield mailingService_1.default.send_select_plan(plan);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error(err);
        return res
            .status(404)
            .json({ error: err || "No se pudo agregar el correo" });
    }
});
const send_mass_email = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, message, recipients } = req.body;
        const newRecipient = yield mailingService_1.default.send_mass_email(subject, message, recipients);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error(err);
        return res
            .status(404)
            .json({ error: err || "No se pudo agregar el correo" });
    }
});
const send_welcome_platform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newRecipient = yield mailingService_1.default.send_welcome_platform(userData);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error("Error en send_welcome_platform:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo enviar el correo de bienvenida" });
    }
});
const send_admin_new_subscription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newRecipient = yield mailingService_1.default.send_admin_new_subscription(userData);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: err || "No se pudo enviar la notificación al admin" });
    }
});
exports.default = {
    send_select_plan,
    send_mass_email,
    send_welcome_platform,
    send_admin_new_subscription
};
//# sourceMappingURL=mailingController.js.map