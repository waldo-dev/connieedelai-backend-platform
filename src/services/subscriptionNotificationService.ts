import { Op } from "sequelize";
import Subscription, { ISubscriptionDB } from "../models/subscription";
import User from "../models/user";
import mailingService from "./mailingService";

/**
 * Busca y envía correos a usuarios cuyas membresías están por vencer (3 días)
 */
const checkAndSendExpiringSoon = async () => {
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
    const expiringSubscriptions = await Subscription.findAll({
      where: {
        end_date: {
          [Op.between]: [threeDaysFromNowStart, threeDaysFromNowEnd]
        },
        status: {
          [Op.in]: ["active", "activa", "activo"] // Diferentes variaciones posibles del status
        }
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "lastname", "email"]
        }
      ]
    });

    console.log(`📧 Encontradas ${expiringSubscriptions.length} suscripciones por vencer en 3 días`);

    const results = [];
    for (const subscription of expiringSubscriptions) {
      const subscriptionData = subscription.toJSON() as any;
      // Acceder al usuario según Sequelize incluye el modelo como "User" por defecto
      const user = (subscription as any).User || subscriptionData.User;

      if (!user || !user.email) {
        console.warn(`⚠️ Suscripción ${subscriptionData.id} no tiene usuario asociado o email`);
        continue;
      }

      try {
        await mailingService.send_expiring_soon({
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
      } catch (error: any) {
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
  } catch (error: any) {
    console.error("❌ Error en checkAndSendExpiringSoon:", error);
    throw error;
  }
};

/**
 * Busca y envía correos a usuarios cuyas membresías ya expiraron
 */
const checkAndSendExpired = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar suscripciones que expiraron (end_date < hoy)
    // y que todavía están marcadas como activas (para no enviar múltiples veces)
    const expiredSubscriptions = await Subscription.findAll({
      where: {
        end_date: {
          [Op.lt]: today
        },
        status: {
          [Op.in]: ["active", "activa", "activo"] // Solo enviar a las que todavía están marcadas como activas
        }
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "lastname", "email"]
        }
      ]
    });

    console.log(`📧 Encontradas ${expiredSubscriptions.length} suscripciones expiradas`);

    const results = [];
    for (const subscription of expiredSubscriptions) {
      const subscriptionData = subscription.toJSON() as any;
      // Acceder al usuario según Sequelize incluye el modelo como "User" por defecto
      const user = (subscription as any).User || subscriptionData.User;

      if (!user || !user.email) {
        console.warn(`⚠️ Suscripción ${subscriptionData.id} no tiene usuario asociado o email`);
        continue;
      }

      try {
        await mailingService.send_expired({
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
      } catch (error: any) {
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
  } catch (error: any) {
    console.error("❌ Error en checkAndSendExpired:", error);
    throw error;
  }
};

/**
 * Ejecuta ambas verificaciones: expiring soon y expired
 */
const checkAndSendAllNotifications = async () => {
  console.log("🔄 Iniciando verificación de suscripciones...");
  
  const expiringResult = await checkAndSendExpiringSoon();
  const expiredResult = await checkAndSendExpired();

  return {
    expiring: expiringResult,
    expired: expiredResult,
    summary: {
      totalProcessed: expiringResult.total + expiredResult.total,
      totalSent: expiringResult.sent + expiredResult.sent,
      totalErrors: expiringResult.errors + expiredResult.errors
    }
  };
};

export default {
  checkAndSendExpiringSoon,
  checkAndSendExpired,
  checkAndSendAllNotifications
};

