import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Meeting from "../models/meeting";

const get_meeting = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Meeting.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_meeting = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const meetingBuilded = Meeting.build(data);
  const resultValidate = await meetingBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const meetingCreated: any = await meetingBuilded
    .save()
    .catch((err) => ({ err }));

  if (meetingCreated.err) res.status(409).json(meetingCreated.err.errors);

  res.status(200).json(meetingCreated);
};

const get_meeting_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const meeting = await Meeting.findByPk(id);
    if (!meeting) return res.status(404).json("meeting not found");
    
    return res.status(200).json(meeting);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_meeting_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Meeting.findByPk(id);

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
  get_meeting_by_id,
  put_meeting_by_id,
  get_meeting,
  post_meeting,
};
