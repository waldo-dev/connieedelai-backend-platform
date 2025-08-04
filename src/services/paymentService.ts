import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Payment from "../models/payments";

const get_payment = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Payment.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_payment = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const paymentBuilded = Payment.build(data);
  const resultValidate = await paymentBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const paymentCreated: any = await paymentBuilded
    .save()
    .catch((err) => ({ err }));

  if (paymentCreated.err) res.status(409).json(paymentCreated.err.errors);

  res.status(200).json(paymentCreated);
};

const get_payment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json("payment not found");
    
    return res.status(200).json(payment);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_payment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Payment.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");
  else {
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } else return res.status(200).json(objectUpdated);
  }
};



export default {
  get_payment_by_id,
  put_payment_by_id,
  get_payment,
  post_payment,
};
