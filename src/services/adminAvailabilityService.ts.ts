import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import AdminAvailability from "../models/admin_availability";

const get_adminAvailability = async (req: Request, res: Response, next: NextFunction) => {

  const result = await AdminAvailability.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_adminAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const adminAvailabilityBuilded = AdminAvailability.build(data);
  const resultValidate = await adminAvailabilityBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const adminAvailabilityCreated: any = await adminAvailabilityBuilded
    .save()
    .catch((err) => ({ err }));

  if (adminAvailabilityCreated.err) res.status(409).json(adminAvailabilityCreated.err.errors);

  res.status(200).json(adminAvailabilityCreated);
};

const get_adminAvailability_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const adminAvailability = await AdminAvailability.findByPk(id);
    if (!adminAvailability) return res.status(404).json("adminAvailability not found");
    
    return res.status(200).json(adminAvailability);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_adminAvailability_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await AdminAvailability.findByPk(id);

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
  get_adminAvailability_by_id,
  put_adminAvailability_by_id,
  get_adminAvailability,
  post_adminAvailability,
};
