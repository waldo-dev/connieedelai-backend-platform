import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Label from "../models/label";

const get_rol = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Label.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_rol = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const rolBuilded = Label.build(data);
  const resultValidate = await rolBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const rolCreated: any = await rolBuilded
    .save()
    .catch((err) => ({ err }));

  if (rolCreated.err) res.status(409).json(rolCreated.err.errors);

  res.status(200).json(rolCreated);
};

const get_rol_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const rol = await Label.findByPk(id);
    if (!rol) return res.status(404).json("rol not found");
    
    return res.status(200).json(rol);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_rol_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Label.findByPk(id);

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
  get_rol_by_id,
  put_rol_by_id,
  get_rol,
  post_rol,
};
