import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import ContentModule from "../models/content_module";

const get_contentModule = async (req: Request, res: Response, next: NextFunction) => {

  const result = await ContentModule.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_contentModule = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const contentModuleBuilded = ContentModule.build(data);
  const resultValidate = await contentModuleBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const contentModuleCreated: any = await contentModuleBuilded
    .save()
    .catch((err) => ({ err }));

  if (contentModuleCreated.err) res.status(409).json(contentModuleCreated.err.errors);

  res.status(200).json(contentModuleCreated);
};

const get_contentModule_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const contentModule = await ContentModule.findByPk(id);
    if (!contentModule) return res.status(404).json("contentModule not found");
    
    return res.status(200).json(contentModule);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_contentModule_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await ContentModule.findByPk(id);

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
  get_contentModule_by_id,
  put_contentModule_by_id,
  get_contentModule,
  post_contentModule,
};
