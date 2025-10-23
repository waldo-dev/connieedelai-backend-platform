import { Request, Response, NextFunction } from "express";
import mailingService from "../services/mailingService";

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

export default {
  send_select_plan,
  send_mass_email,
  send_welcome_platform,
  send_admin_new_subscription
};
