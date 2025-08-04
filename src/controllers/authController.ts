import { Request, Response, NextFunction } from "express";
import { default as authService } from "../services/authService";

const auth_login = async (req: Request, res: Response, next: NextFunction) => {
	return authService.auth_login(req, res, next);
};

const auth_autorization = async (req: Request, res: Response, next: NextFunction) => {
	return authService.auth_autorization(req, res, next);
};

export default { auth_login, auth_autorization };
