import { Request, Response, NextFunction } from "express";
import mailingService from "../services/mailingService";
import subscriptionNotificationService from "../services/subscriptionNotificationService";

const send_select_plan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plan = req.body;
    const newRecipient = await mailingService.send_select_plan(plan);
    return res.status(200).json(newRecipient);
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: err || "No se pudo agregar el correo" });
  }
};

const send_mass_email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {subject, message, recipients} = req.body;
    const newRecipient = await mailingService.send_mass_email(subject, message, recipients);
    return res.status(200).json(newRecipient);
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: err || "No se pudo agregar el correo" });
  }
};

const send_welcome_platform = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const newRecipient = await mailingService.send_welcome_platform(userData);
    return res.status(200).json(newRecipient);
  } catch (err: any) {
    console.error("Error en send_welcome_platform:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo enviar el correo de bienvenida" });
  }
};

const send_admin_new_subscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const newRecipient = await mailingService.send_admin_new_subscription(userData);
    return res.status(200).json(newRecipient);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err || "No se pudo enviar la notificación al admin" });
  }
}

const send_expiring_soon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const result = await mailingService.send_expiring_soon(userData);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Error en send_expiring_soon:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo enviar el correo de membresía por vencer" });
  }
};

const send_expired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const result = await mailingService.send_expired(userData);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Error en send_expired:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo enviar el correo de membresía expirada" });
  }
};

const check_expiring_subscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscriptionNotificationService.checkAndSendExpiringSoon();
    return res.status(200).json({
      message: "Verificación de suscripciones por vencer completada",
      ...result
    });
  } catch (err: any) {
    console.error("Error en check_expiring_subscriptions:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo verificar las suscripciones por vencer" });
  }
};

const check_expired_subscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscriptionNotificationService.checkAndSendExpired();
    return res.status(200).json({
      message: "Verificación de suscripciones expiradas completada",
      ...result
    });
  } catch (err: any) {
    console.error("Error en check_expired_subscriptions:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo verificar las suscripciones expiradas" });
  }
};

const check_all_subscription_notifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscriptionNotificationService.checkAndSendAllNotifications();
    return res.status(200).json({
      message: "Verificación completa de suscripciones realizada",
      ...result
    });
  } catch (err: any) {
    console.error("Error en check_all_subscription_notifications:", err);
    return res
      .status(500)
      .json({ error: err?.message || "No se pudo verificar las suscripciones" });
  }
};

export default {
  send_select_plan,
  send_mass_email,
  send_welcome_platform,
  send_admin_new_subscription,
  send_expiring_soon,
  send_expired,
  check_expiring_subscriptions,
  check_expired_subscriptions,
  check_all_subscription_notifications
};
