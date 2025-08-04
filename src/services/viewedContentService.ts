import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import ViewedContent from "../models/viewed_contents";

const get_viewedContent = async (req: Request, res: Response, next: NextFunction) => {

  const result = await ViewedContent.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_viewedContent = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const viewedContentBuilded = ViewedContent.build(data);
  const resultValidate = await viewedContentBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const viewedContentCreated: any = await viewedContentBuilded
    .save()
    .catch((err) => ({ err }));

  if (viewedContentCreated.err) res.status(409).json(viewedContentCreated.err.errors);

  res.status(200).json(viewedContentCreated);
};

const get_viewedContent_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const viewedContent = await ViewedContent.findByPk(id);
    if (!viewedContent) return res.status(404).json("viewedContent not found");
    
    return res.status(200).json(viewedContent);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_viewedContent_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await ViewedContent.findByPk(id);

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
  get_viewedContent_by_id,
  put_viewedContent_by_id,
  get_viewedContent,
  post_viewedContent,
};
