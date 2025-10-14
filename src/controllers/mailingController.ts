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

export default {
  send_select_plan,
  send_mass_email
};
