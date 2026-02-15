import { Request, Response, NextFunction } from "express";
import { default as contentService } from "../services/contentService";

const get_content_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await contentService.get_content(req, res, next);
};

const post_content = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.post_content(req, res, next);
};

const get_content = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_by_id(req, res, next);
};

const put_content_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.put_content_by_id(req, res, next);
};

const get_content_by_section = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_by_section(req, res, next);
};

const get_content_training = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_training(req, res, next);
};

const get_content_nutrition = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_nutrition(req, res, next);
};

const get_content_training_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_training_by_id(req, res, next);
};

const get_content_nutrition_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.get_content_nutrition_by_id(req, res, next);
};

const post_content_with_upload = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.post_content_with_upload(req, res, next);
};

const generate_upload_url = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.generate_upload_url(req, res, next);
};

const delete_content_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.delete_content_by_id(req, res, next);
};

const convert_content_to_hls = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.convert_content_to_hls(req, res, next);
};

const convert_all_to_hls = async (req: Request, res: Response, next: NextFunction) => {
  return await contentService.convert_all_to_hls(req, res, next);
};


export default {
  get_content_all,
  post_content,
  get_content,
  put_content_by_id,
  get_content_training,
  get_content_nutrition,
  get_content_training_by_id,
  get_content_nutrition_by_id,
  post_content_with_upload,
  delete_content_by_id,
  generate_upload_url,
  get_content_by_section,
  convert_content_to_hls,
  convert_all_to_hls
};
