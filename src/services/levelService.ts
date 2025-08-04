import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Level from "../models/level";

const get_level = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Level.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_level = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const levelBuilded = Level.build(data);
  const resultValidate = await levelBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const levelCreated: any = await levelBuilded
    .save()
    .catch((err) => ({ err }));

  if (levelCreated.err) res.status(409).json(levelCreated.err.errors);

  res.status(200).json(levelCreated);
};

const get_level_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const level = await Level.findByPk(id);
    if (!level) return res.status(404).json("level not found");
    
    return res.status(200).json(level);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_level_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Level.findByPk(id);

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
  get_level_by_id,
  put_level_by_id,
  get_level,
  post_level,
};
