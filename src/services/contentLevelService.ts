import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import ContentLevel from "../models/content_level";

const get_contentLevel = async (req: Request, res: Response, next: NextFunction) => {

  const result = await ContentLevel.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_contentLevel = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const contentLevelBuilded = ContentLevel.build(data);
  const resultValidate = await contentLevelBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const contentLevelCreated: any = await contentLevelBuilded
    .save()
    .catch((err) => ({ err }));

  if (contentLevelCreated.err) res.status(409).json(contentLevelCreated.err.errors);

  res.status(200).json(contentLevelCreated);
};

const get_contentLevel_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const contentLevel = await ContentLevel.findByPk(id);
    if (!contentLevel) return res.status(404).json("contentLevel not found");
    
    return res.status(200).json(contentLevel);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_contentLevel_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await ContentLevel.findByPk(id);

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
  get_contentLevel_by_id,
  put_contentLevel_by_id,
  get_contentLevel,
  post_contentLevel,
};
