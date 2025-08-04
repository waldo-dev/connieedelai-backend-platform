import { Request, Response, NextFunction } from "express";
import { default as rolService } from "../services/rolService";

const get_rol = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await rolService.get_rol(req, res, next);
};

const get_rol_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await rolService.get_rol_by_id(req, res, next);
}

const post_rol = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await rolService.post_rol(req, res, next);
};


const put_rol_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await rolService.put_rol_by_id(req, res, next);
};

// const delete_rol = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	return await rolService.delete(req, res, next);
// };

export default {
	get_rol,
	post_rol,
	put_rol_by_id,
	get_rol_by_id,
	// delete_rol
};
