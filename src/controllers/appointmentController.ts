import { Request, Response, NextFunction } from "express";
import { default as appointmentService } from "../services/appointmentService";

const get_appointment_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await appointmentService.get_appointment(req, res, next);
};

const post_appointment = async (req: Request, res: Response, next: NextFunction) => {
  return await appointmentService.post_appointment(req, res, next);
};

const get_appointment_by_client_id = async (req: Request, res: Response, next: NextFunction) => {
  return await appointmentService.get_appointment_by_client_id(req, res, next);
};

const put_appointment = async (req: Request, res: Response, next: NextFunction) => {
  return await appointmentService.put_appointment_by_id(req, res, next);
};


export default {
  get_appointment_all,
  post_appointment,
  get_appointment_by_client_id,
  put_appointment,
};
