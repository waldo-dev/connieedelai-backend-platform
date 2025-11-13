"use strict";
/**
 * Job programado para verificar y enviar notificaciones de suscripciones
 *
 * Este archivo puede ser ejecutado por un cron job externo o por node-cron
 * Para usar node-cron, instala: npm install node-cron @types/node-cron
 */
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
exports.startSubscriptionNotificationsCron = exports.runSubscriptionNotificationsJob = void 0;
const subscriptionNotificationService_1 = __importDefault(require("../services/subscriptionNotificationService"));
/**
 * Ejecuta la verificación completa de suscripciones
 * Esta función se puede llamar desde un cron job externo o desde node-cron
 */
const runSubscriptionNotificationsJob = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Iniciando job de notificaciones de suscripciones...");
        const result = yield subscriptionNotificationService_1.default.checkAndSendAllNotifications();
        console.log("✅ Job completado:");
        console.log(`   - Suscripciones por vencer: ${result.expiring.sent} enviadas`);
        console.log(`   - Suscripciones expiradas: ${result.expired.sent} enviadas`);
        console.log(`   - Total procesadas: ${result.summary.totalProcessed}`);
        console.log(`   - Errores: ${result.summary.totalErrors}`);
        return result;
    }
    catch (error) {
        console.error("❌ Error ejecutando job de notificaciones:", error);
        throw error;
    }
});
exports.runSubscriptionNotificationsJob = runSubscriptionNotificationsJob;
// Configuración automática con node-cron
const node_cron_1 = __importDefault(require("node-cron"));
/**
// * Configura el cron job para ejecutar las notificaciones automáticamente
// *
// * Horarios disponibles:
// * - "0 9 * * *"      → Todos los días a las 9:00 AM (recomendado)
// * - "0 9,18 * * *"   → A las 9:00 AM y 6:00 PM todos los días
// * - "0 0 * * *"      → Todos los días a medianoche
// *
// * Formato: minuto hora día mes día-semana
// * Ejemplo: "0 9 * * *" = minuto 0, hora 9, todos los días, todos los meses, todos los días de la semana
// */
const startSubscriptionNotificationsCron = () => {
    // Ejecutar todos los días a las 9:00 AM
    node_cron_1.default.schedule("0 9 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("⏰ [CRON] Ejecutando verificación diaria de suscripciones...");
        try {
            yield (0, exports.runSubscriptionNotificationsJob)();
        }
        catch (error) {
            console.error("❌ [CRON] Error en job de suscripciones:", error);
        }
    }));
    console.log("✅ [CRON] Job de notificaciones de suscripciones configurado: todos los días a las 9:00 AM");
};
exports.startSubscriptionNotificationsCron = startSubscriptionNotificationsCron;
// Si prefieres usar un cron job externo (recomendado para producción en alta escala),
// puedes deshabilitar esta configuración y usar un servicio como:
// - AWS EventBridge
// - Google Cloud Scheduler  
// - Azure Logic Apps
// - Cron job del sistema operativo
//# sourceMappingURL=subscriptionNotificationsJob.js.map