import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import ContentSection from "../models/content_section";

const get_contentSection = async (req: Request, res: Response, next: NextFunction) => {

  const result = await ContentSection.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_contentSection = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const contentSectionBuilded = ContentSection.build(data);
  const resultValidate = await contentSectionBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const contentSectionCreated: any = await contentSectionBuilded
    .save()
    .catch((err) => ({ err }));

  if (contentSectionCreated.err) res.status(409).json(contentSectionCreated.err.errors);

  res.status(200).json(contentSectionCreated);
};

const get_contentSection_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const contentSection = await ContentSection.findByPk(id);
    if (!contentSection) return res.status(404).json("contentSection not found");
    
    return res.status(200).json(contentSection);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_contentSection_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await ContentSection.findByPk(id);

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
  get_contentSection_by_id,
  put_contentSection_by_id,
  get_contentSection,
  post_contentSection,
};
