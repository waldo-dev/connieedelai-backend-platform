"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const authController_1 = __importDefault(require("../controllers/authController"));
const authRoute = express_1.default.Router();
authRoute.route("/login").post(authController_1.default.auth_login);
authRoute.route("/logout").post(auth_1.isAuthorized);
authRoute
    .route("/autorizated")
    .post(auth_1.isAuthorized, authController_1.default.auth_autorization);
// authRoute.route("/recoveryPassword").post(userControllers.recovery_password);
// authRoute
// 	.route("/resetPassword")
// 	.post(jwtResetPassword, userControllers.reset_password);
// authRoute
// 	.route("/autorizated")
// 	.post(jwtAutorization, userControllers.auth_autorization);
exports.default = authRoute;
//# sourceMappingURL=authRoute.js.map