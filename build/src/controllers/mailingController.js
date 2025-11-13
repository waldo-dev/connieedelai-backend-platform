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
const subscriptionNotificationService_1 = __importDefault(require("../services/subscriptionNotificationService"));
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
const send_welcome_platform_ore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newRecipient = yield mailingService_1.default.send_welcome_platform_ore(userData);
        return res.status(200).json(newRecipient);
    }
    catch (err) {
        console.error("Error en send_welcome_platform:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo enviar el correo de bienvenida" });
    }
});
const send_welcome_platform_plata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newRecipient = yield mailingService_1.default.send_welcome_platform_plata(userData);
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
const send_expiring_soon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield mailingService_1.default.send_expiring_soon(userData);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error("Error en send_expiring_soon:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo enviar el correo de membresía por vencer" });
    }
});
const send_expired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield mailingService_1.default.send_expired(userData);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error("Error en send_expired:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo enviar el correo de membresía expirada" });
    }
});
const check_expiring_subscriptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscriptionNotificationService_1.default.checkAndSendExpiringSoon();
        return res.status(200).json(Object.assign({ message: "Verificación de suscripciones por vencer completada" }, result));
    }
    catch (err) {
        console.error("Error en check_expiring_subscriptions:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo verificar las suscripciones por vencer" });
    }
});
const check_expired_subscriptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscriptionNotificationService_1.default.checkAndSendExpired();
        return res.status(200).json(Object.assign({ message: "Verificación de suscripciones expiradas completada" }, result));
    }
    catch (err) {
        console.error("Error en check_expired_subscriptions:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo verificar las suscripciones expiradas" });
    }
});
const check_all_subscription_notifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscriptionNotificationService_1.default.checkAndSendAllNotifications();
        return res.status(200).json(Object.assign({ message: "Verificación completa de suscripciones realizada" }, result));
    }
    catch (err) {
        console.error("Error en check_all_subscription_notifications:", err);
        return res
            .status(500)
            .json({ error: (err === null || err === void 0 ? void 0 : err.message) || "No se pudo verificar las suscripciones" });
    }
});
exports.default = {
    send_select_plan,
    send_mass_email,
    send_welcome_platform_ore,
    send_welcome_platform_plata,
    send_admin_new_subscription,
    send_expiring_soon,
    send_expired,
    check_expiring_subscriptions,
    check_expired_subscriptions,
    check_all_subscription_notifications
};
//# sourceMappingURL=mailingController.js.map