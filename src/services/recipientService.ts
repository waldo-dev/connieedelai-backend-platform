import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import Recipient from "../models/recipient";
import mailingService from "./mailingService";

const post_recipient = async (email: string) => {
  try {
    const isExist = await Recipient.findOne({
      where: {
        email
      }
    })
    if(isExist && isExist.dataValues) throw new Error("el usuario ya esta registrado");

    const recipientBuilded = Recipient.build({ email });
    const resultValidate = await recipientBuilded
      .validate()
      .catch((err: ValidationError) => err);

    if ((resultValidate as ValidationError).errors) throw new Error("El usuario no se puede registrar");

    const recipientCreated: any = await recipientBuilded
      .save()
      .catch((err) => ({ err }));

    if (recipientCreated.err) throw new Error("No se logro crear");

    const sendConfirmation = mailingService.send_confirm_subscription(email);

    return { recipientCreated, sendConfirmation };
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const get_recipient_by_email = async (email: string) => {
  try {
    const recipient = await Recipient.findOne({
      where: {
        email: email,
      },
    });
    if (!recipient) throw new Error("El correo no esta registrado");
    
    return recipient;
  } catch (err) {
    console.error(err);
  }
};

const get_recipient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await Recipient.findAll();
  if (!result) return res.status(500).json();
  return res.status(200).json(result);
};


const get_recipient_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const recipient = await Recipient.findByPk(id);
    if (!recipient) return res.status(404).json("recipient not found");

    return res.status(200).json(recipient);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  get_recipient_by_id,
  get_recipient_by_email,
  get_recipient,
  post_recipient,
};
