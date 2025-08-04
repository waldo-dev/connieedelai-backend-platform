import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Subscription from "../models/subscription";

const get_subscription = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Subscription.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_subscription = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const subscriptionBuilded = Subscription.build(data);
  const resultValidate = await subscriptionBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const subscriptionCreated: any = await subscriptionBuilded
    .save()
    .catch((err) => ({ err }));

  if (subscriptionCreated.err) res.status(409).json(subscriptionCreated.err.errors);

  res.status(200).json(subscriptionCreated);
};

const get_subscription_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const subscription = await Subscription.findByPk(id);
    if (!subscription) return res.status(404).json("subscription not found");
    
    return res.status(200).json(subscription);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_subscription_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Subscription.findByPk(id);

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
  get_subscription_by_id,
  put_subscription_by_id,
  get_subscription,
  post_subscription,
};
