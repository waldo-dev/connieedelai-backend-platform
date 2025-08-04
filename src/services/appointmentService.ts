import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Appointment from "../models/appointment";

const get_appointment = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Appointment.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_appointment = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const appointmentBuilded = Appointment.build(data);
  const resultValidate = await appointmentBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const appointmentCreated: any = await appointmentBuilded
    .save()
    .catch((err) => ({ err }));

  if (appointmentCreated.err) res.status(409).json(appointmentCreated.err.errors);

  res.status(200).json(appointmentCreated);
};

const get_appointment_by_client_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const appointment = await Appointment.findAll({
      where: {
        client_id: id
      }
    });
    if (!appointment) return res.status(404).json("appointment not found");
    
    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_appointment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Appointment.findByPk(id);

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
  get_appointment_by_client_id,
  put_appointment_by_id,
  get_appointment,
  post_appointment,
};
