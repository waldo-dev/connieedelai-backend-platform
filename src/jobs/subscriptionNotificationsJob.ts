/**
 * Job programado para verificar y enviar notificaciones de suscripciones
 * 
 * Este archivo puede ser ejecutado por un cron job externo o por node-cron
 * Para usar node-cron, instala: npm install node-cron @types/node-cron
 */

import subscriptionNotificationService from "../services/subscriptionNotificationService";

/**
 * Ejecuta la verificación completa de suscripciones
 * Esta función se puede llamar desde un cron job externo o desde node-cron
 */
export const runSubscriptionNotificationsJob = async () => {
  try {
    console.log("🔄 Iniciando job de notificaciones de suscripciones...");
    const result = await subscriptionNotificationService.checkAndSendAllNotifications();
    
    console.log("✅ Job completado:");
    console.log(`   - Suscripciones por vencer: ${result.expiring.sent} enviadas`);
    console.log(`   - Suscripciones expiradas: ${result.expired.sent} enviadas`);
    console.log(`   - Total procesadas: ${result.summary.totalProcessed}`);
    console.log(`   - Errores: ${result.summary.totalErrors}`);
    
    return result;
  } catch (error: any) {
    console.error("❌ Error ejecutando job de notificaciones:", error);
    throw error;
  }
};

// Configuración automática con node-cron
import cron from "node-cron";

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
  cron.schedule("0 9 * * *", async () => {
    console.log("⏰ [CRON] Ejecutando verificación diaria de suscripciones...");
    try {
      await runSubscriptionNotificationsJob();
    } catch (error) {
      console.error("❌ [CRON] Error en job de suscripciones:", error);
    }
  });
  
  console.log("✅ [CRON] Job de notificaciones de suscripciones configurado: todos los días a las 9:00 AM");
};

// Exportar la función para iniciarlo desde bin/www.ts
export { startSubscriptionNotificationsCron };

// Si prefieres usar un cron job externo (recomendado para producción en alta escala),
// puedes deshabilitar esta configuración y usar un servicio como:
// - AWS EventBridge
// - Google Cloud Scheduler  
// - Azure Logic Apps
// - Cron job del sistema operativo

