import { Request, Response, NextFunction } from "express";
import { default as userService } from "../services/userService";

const get_user_all = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userService.get_user_all(req, res, next);
};

const post_user = async (req: Request, res: Response, next: NextFunction) => {
	return await userService.post_user(req, res, next);
};

const get_user = async (req: Request, res: Response, next: NextFunction) => {
	return await userService.get_user_by_id(req, res, next);
};

const put_user = async (req: Request, res: Response, next: NextFunction) => {
	return await userService.put_user(req, res, next);
};

const delete_user = async (req: Request, res: Response, next: NextFunction) => {
	return await userService.delete_user(req, res, next);
};

const get_user_by_rol = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userService.get_user_by_rol(req, res, next);
};

// const sendMailCreate = async (req: Request, res: Response) => {
// 	return await userService.sendMailCreate(req, res);
// };

const generatePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userService.generatePassword(req, res, next);
};

const post_user_by_email = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await userService.post_user_by_email(req, res, next);
  };

export default {
	get_user_all,
	post_user,
	get_user,
	put_user,
	delete_user,
	// sendMailCreate,
	generatePassword,
	post_user_by_email,
	get_user_by_rol,
};
