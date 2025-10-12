import { Request, Response, NextFunction } from "express";
import recipientService from "../services/recipientService";

const get_recipient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await recipientService.get_recipient(req, res, next);
};

const get_recipient_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await recipientService.get_recipient_by_id(req, res, next);
};

const get_recipient_by_email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const recipient = await recipientService.get_recipient_by_email(email);
    return res.status(200).json(recipient);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err || "No se encontró el correo" });
  }
};

const post_recipient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const newRecipient = await recipientService.post_recipient(email);
    return res.status(200).json(newRecipient);
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: err || "No se pudo agregar el correo" });
  }
};

export default {
  get_recipient_by_id,
  get_recipient_by_email,
  get_recipient,
  post_recipient,
};
