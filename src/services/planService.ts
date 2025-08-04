import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Plan from "../models/plan";

const get_plan = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Plan.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_plan = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const planBuilded = Plan.build(data);
  const resultValidate = await planBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const planCreated: any = await planBuilded
    .save()
    .catch((err) => ({ err }));

  if (planCreated.err) res.status(409).json(planCreated.err.errors);

  res.status(200).json(planCreated);
};

const get_plan_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const plan = await Plan.findByPk(id);
    if (!plan) return res.status(404).json("plan not found");
    
    return res.status(200).json(plan);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_plan_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Plan.findByPk(id);

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
  get_plan_by_id,
  put_plan_by_id,
  get_plan,
  post_plan,
};
