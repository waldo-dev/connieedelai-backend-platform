/**
 * Job programado para convertir videos MP4 a HLS automáticamente
 * 
 * Este job busca videos que tienen URL pero no tienen hls_url
 * y los convierte automáticamente a formato HLS para mejorar la carga
 */

import { processHLSConversions } from "../services/hlsConversionJobService";

/**
 * Ejecuta la conversión de videos a HLS
 * Esta función se puede llamar desde un cron job externo o desde node-cron
 */
export const runHLSConversionJob = async () => {
  try {
    console.log("🔄 Iniciando job de conversión HLS...");
    const result = await processHLSConversions();
    
    console.log("✅ Job de conversión HLS completado:");
    console.log(`   - Videos procesados: ${result.processed}`);
    console.log(`   - Exitosos: ${result.successful}`);
    console.log(`   - Fallidos: ${result.failed}`);
    
    return result;
  } catch (error: any) {
    console.error("❌ Error ejecutando job de conversión HLS:", error);
    throw error;
  }
};

// Configuración automática con node-cron
import cron from "node-cron";

// Configura el cron job para ejecutar las conversiones automáticamente
// Horarios disponibles:
// - "0 */6 * * *"    Cada 6 horas (recomendado)
// - "0 */4 * * *"    Cada 4 horas
// - "0 2 * * *"      Todos los dias a las 2:00 AM
// - "0 */12 * * *"   Cada 12 horas
// Formato del cron: minuto hora dia mes dia-semana
const startHLSConversionCron = () => {
  // Ejecutar cada 6 horas
  cron.schedule("0 */6 * * *", async () => {
    console.log("⏰ [CRON] Ejecutando conversión automática de videos a HLS...");
    try {
      await runHLSConversionJob();
    } catch (error) {
      console.error("❌ [CRON] Error en job de conversión HLS:", error);
    }
  });
  
  console.log("✅ [CRON] Job de conversión HLS configurado: cada 6 horas");
};

// Exportar la función para iniciarlo desde bin/www.ts
export { startHLSConversionCron };

// Si prefieres usar un cron job externo (recomendado para producción en alta escala),
// puedes deshabilitar esta configuración y usar un servicio como:
// - AWS EventBridge
// - Google Cloud Scheduler  
// - Azure Logic Apps
// - Cron job del sistema operativo

