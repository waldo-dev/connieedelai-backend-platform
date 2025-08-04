import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import PlanModule from "../models/plan_module";

const get_planModule = async (req: Request, res: Response, next: NextFunction) => {

  const result = await PlanModule.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_planModule = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const planModuleBuilded = PlanModule.build(data);
  const resultValidate = await planModuleBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const planModuleCreated: any = await planModuleBuilded
    .save()
    .catch((err) => ({ err }));

  if (planModuleCreated.err) res.status(409).json(planModuleCreated.err.errors);

  res.status(200).json(planModuleCreated);
};

const get_planModule_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const planModule = await PlanModule.findByPk(id);
    if (!planModule) return res.status(404).json("planModule not found");
    
    return res.status(200).json(planModule);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_planModule_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await PlanModule.findByPk(id);

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
  get_planModule_by_id,
  put_planModule_by_id,
  get_planModule,
  post_planModule,
};
