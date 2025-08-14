import { Request, Response, NextFunction } from "express";
import { default as sectionService } from "../services/sectionService";

const get_section = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await sectionService.get_section(req, res, next);
};

const post_section = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.post_section(req, res, next);
};

const get_section_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.get_section_by_id(req, res, next);
}

const put_section_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.put_section_by_id(req, res, next);
};

const get_contents_by_section_grouped_by_module = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.get_contents_by_section_grouped_by_module(req, res, next);
};

const get_modules_by_section = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.get_modules_by_section(req, res, next);
};

const get_bonus_by_section = async (req: Request, res: Response, next: NextFunction) => {
  return await sectionService.get_modules_by_section(req, res, next);
};

export default {
  get_section,
  post_section,
  get_section_by_id,
  put_section_by_id,
  get_contents_by_section_grouped_by_module,
  get_modules_by_section,
  get_bonus_by_section,
};
