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
const sequelize_1 = require("sequelize");
const subscription_1 = __importDefault(require("../models/subscription"));
const user_1 = __importDefault(require("../models/user"));
const mailingService_1 = __importDefault(require("./mailingService"));
/**
 * Busca y envía correos a usuarios cuyas membresías están por vencer (3 días)
 */
const checkAndSendExpiringSoon = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calcular la fecha de 3 días desde hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const threeDaysFromNowStart = new Date(today);
        threeDaysFromNowStart.setDate(today.getDate() + 3);
        threeDaysFromNowStart.setHours(0, 0, 0, 0);
        const threeDaysFromNowEnd = new Date(threeDaysFromNowStart);
        threeDaysFromNowEnd.setHours(23, 59, 59, 999);
        // Buscar suscripciones que expiran en exactamente 3 días (todo el día de hoy + 3 días)
        // y que están activas (puede ser "active" o cualquier otro status activo)
        const expiringSubscriptions = yield subscription_1.default.findAll({
            where: {
                end_date: {
                    [sequelize_1.Op.between]: [threeDaysFromNowStart, threeDaysFromNowEnd]
                },
                status: {
                    [sequelize_1.Op.in]: ["active", "activa", "activo"] // Diferentes variaciones posibles del status
                }
            },
            include: [
                {
                    model: user_1.default,
                    attributes: ["id", "name", "lastname", "email"]
                }
            ]
        });
        console.log(`📧 Encontradas ${expiringSubscriptions.length} suscripciones por vencer en 3 días`);
        const results = [];
        for (const subscription of expiringSubscriptions) {
            const subscriptionData = subscription.toJSON();
            // Acceder al usuario según Sequelize incluye el modelo como "User" por defecto
            const user = subscription.User || subscriptionData.User;
            if (!user || !user.email) {
                console.warn(`⚠️ Suscripción ${subscriptionData.id} no tiene usuario asociado o email`);
                continue;
            }
            try {
                yield mailingService_1.default.send_expiring_soon({
                    email: user.email,
                    name: `${user.name} ${user.lastname}`.trim(),
                    expirationDate: subscriptionData.end_date
                });
                results.push({
                    subscriptionId: subscriptionData.id,
                    userId: user.id,
                    email: user.email,
                    status: "sent"
                });
                console.log(`✅ Correo de expiración próxima enviado a: ${user.email}`);
            }
            catch (error) {
                console.error(`❌ Error enviando correo a ${user.email}:`, error.message);
                results.push({
                    subscriptionId: subscriptionData.id,
                    userId: user.id,
                    email: user.email,
                    status: "error",
                    error: error.message
                });
            }
        }
        return {
            total: expiringSubscriptions.length,
            sent: results.filter(r => r.status === "sent").length,
            errors: results.filter(r => r.status === "error").length,
            results
        };
    }
    catch (error) {
        console.error("❌ Error en checkAndSendExpiringSoon:", error);
        throw error;
    }
});
/**
 * Busca y envía correos a usuarios cuyas membresías ya expiraron
 */
const checkAndSendExpired = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Buscar suscripciones que expiraron (end_date < hoy)
        // y que todavía están marcadas como activas (para no enviar múltiples veces)
        const expiredSubscriptions = yield subscription_1.default.findAll({
            where: {
                end_date: {
                    [sequelize_1.Op.lt]: today
                },
                status: {
                    [sequelize_1.Op.in]: ["active", "activa", "activo"] // Solo enviar a las que todavía están marcadas como activas
                }
            },
            include: [
                {
                    model: user_1.default,
                    attributes: ["id", "name", "lastname", "email"]
                }
            ]
        });
        console.log(`📧 Encontradas ${expiredSubscriptions.length} suscripciones expiradas`);
        const results = [];
        for (const subscription of expiredSubscriptions) {
            const subscriptionData = subscription.toJSON();
            // Acceder al usuario según Sequelize incluye el modelo como "User" por defecto
            const user = subscription.User || subscriptionData.User;
            if (!user || !user.email) {
                console.warn(`⚠️ Suscripción ${subscriptionData.id} no tiene usuario asociado o email`);
                continue;
            }
            try {
                yield mailingService_1.default.send_expired({
                    email: user.email,
                    name: `${user.name} ${user.lastname}`.trim()
                });
                // Opcional: Actualizar el status de la suscripción a "expired"
                // Descomenta esto si quieres marcar automáticamente las suscripciones como expiradas
                // await subscription.update({ status: "expired" });
                results.push({
                    subscriptionId: subscriptionData.id,
                    userId: user.id,
                    email: user.email,
                    status: "sent"
                });
                console.log(`✅ Correo de expiración enviado a: ${user.email}`);
            }
            catch (error) {
                console.error(`❌ Error enviando correo a ${user.email}:`, error.message);
                results.push({
                    subscriptionId: subscriptionData.id,
                    userId: user.id,
                    email: user.email,
                    status: "error",
                    error: error.message
                });
            }
        }
        return {
            total: expiredSubscriptions.length,
            sent: results.filter(r => r.status === "sent").length,
            errors: results.filter(r => r.status === "error").length,
            results
        };
    }
    catch (error) {
        console.error("❌ Error en checkAndSendExpired:", error);
        throw error;
    }
});
/**
 * Ejecuta ambas verificaciones: expiring soon y expired
 */
const checkAndSendAllNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔄 Iniciando verificación de suscripciones...");
    const expiringResult = yield checkAndSendExpiringSoon();
    const expiredResult = yield checkAndSendExpired();
    return {
        expiring: expiringResult,
        expired: expiredResult,
        summary: {
            totalProcessed: expiringResult.total + expiredResult.total,
            totalSent: expiringResult.sent + expiredResult.sent,
            totalErrors: expiringResult.errors + expiredResult.errors
        }
    };
});
exports.default = {
    checkAndSendExpiringSoon,
    checkAndSendExpired,
    checkAndSendAllNotifications
};
//# sourceMappingURL=subscriptionNotificationService.js.map