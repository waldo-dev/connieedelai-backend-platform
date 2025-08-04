import express from "express";
import { isAuthorized } from "../middleware/auth";
import { default as authController } from "../controllers/authController";

const authRoute = express.Router();

authRoute.route("/login").post(authController.auth_login);

authRoute.route("/logout").post(isAuthorized);

authRoute
	.route("/autorizated")
	.post(isAuthorized, authController.auth_autorization);

// authRoute.route("/recoveryPassword").post(userControllers.recovery_password);

// authRoute
// 	.route("/resetPassword")
// 	.post(jwtResetPassword, userControllers.reset_password);

// authRoute
// 	.route("/autorizated")
// 	.post(jwtAutorization, userControllers.auth_autorization);

export default authRoute;
