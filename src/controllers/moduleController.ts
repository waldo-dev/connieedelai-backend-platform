import { Request, Response, NextFunction } from "express";
import { default as modulesService } from "../services/moduleService";

const get_module = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await modulesService.get_module(req, res, next);
};

const post_module = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.post_module(req, res, next);
};

const get_module_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.get_module_by_id(req, res, next);
};

const put_module_by_id = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.put_module_by_id(req, res, next);
};

const get_module_with_contents = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.get_module_with_contents(req, res, next);
};

const get_modules_by_difficulty = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.get_modules_by_difficulty(req, res, next);
};

const delete_module = async (req: Request, res: Response, next: NextFunction) => {
  return await modulesService.delete_module(req, res, next);
};

export default {
  get_module,
  post_module,
  get_module_by_id,
  put_module_by_id,
  get_module_with_contents,
  get_modules_by_difficulty,
  delete_module
};
