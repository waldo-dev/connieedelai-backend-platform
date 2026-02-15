import { Content } from "../models/content";
import { convertVideoToHLS } from "./hlsConversionService";
import { Op } from "sequelize";

/**
 * Busca videos que necesitan conversión a HLS
 * Retorna videos que:
 * - Tienen URL (video original)
 * - NO tienen hls_url
 * - NO están en proceso de conversión (conversion_status !== "processing")
 * - Son de tipo "video"
 */
export const findVideosNeedingHLSConversion = async (): Promise<any[]> => {
  try {
    const videos = await Content.findAll({
      where: {
        url: { [Op.ne]: null as any },
        type: "video",
        [Op.and]: [
          {
            [Op.or]: [
              { hls_url: null },
              { hls_url: "" },
            ],
          },
          {
            [Op.or]: [
              { conversion_status: null },
              { conversion_status: "pending" },
              { conversion_status: "failed" },
            ],
          },
        ],
      } as any,
      limit: 10, // Procesar máximo 10 videos por ejecución para no sobrecargar
    });

    return videos;
  } catch (error) {
    console.error("Error buscando videos para conversión:", error);
    throw error;
  }
};

/**
 * Convierte un video a HLS
 */
const convertSingleVideo = async (content: any): Promise<void> => {
  try {
    if (!content.url || !content.id) {
      throw new Error("Video sin URL o ID válido");
    }

    console.log(`🔄 Convirtiendo video ID ${content.id} a HLS...`);

    // Marcar como "processing"
    await content.update({ conversion_status: "processing" });

    // Convertir a HLS
    const hlsUrl = await convertVideoToHLS(content.url, content.id);

    // Actualizar con hls_url y marcar como "completed"
    await content.update({
      hls_url: hlsUrl,
      conversion_status: "completed",
    });

    console.log(`✅ Video ID ${content.id} convertido exitosamente. HLS URL: ${hlsUrl}`);
  } catch (error) {
    console.error(`❌ Error convirtiendo video ID ${content.id}:`, error);
    
    // Marcar como "failed"
    try {
      await content.update({ conversion_status: "failed" });
    } catch (updateError) {
      console.error("Error actualizando status a failed:", updateError);
    }
    
    throw error;
  }
};

/**
 * Procesa todos los videos que necesitan conversión a HLS
 */
export const processHLSConversions = async () => {
  try {
    console.log("🔍 Buscando videos que necesitan conversión a HLS...");
    
    const videos = await findVideosNeedingHLSConversion();
    
    if (videos.length === 0) {
      console.log("✅ No hay videos pendientes de conversión");
      return {
        total: 0,
        processed: 0,
        successful: 0,
        failed: 0,
        results: [],
      };
    }

    console.log(`📹 Encontrados ${videos.length} videos para convertir`);

    const results = [];
    let successful = 0;
    let failed = 0;

    // Procesar videos uno por uno para no sobrecargar el sistema
    for (const video of videos) {
      try {
        await convertSingleVideo(video);
        successful++;
        results.push({
          contentId: video.id,
          title: video.title,
          status: "success",
        });
      } catch (error) {
        failed++;
        results.push({
          contentId: video.id,
          title: video.title,
          status: "failed",
          error: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    }

    console.log(`✅ Procesamiento completado:`);
    console.log(`   - Total: ${videos.length}`);
    console.log(`   - Exitosos: ${successful}`);
    console.log(`   - Fallidos: ${failed}`);

    return {
      total: videos.length,
      processed: videos.length,
      successful,
      failed,
      results,
    };
  } catch (error) {
    console.error("❌ Error en processHLSConversions:", error);
    throw error;
  }
};

