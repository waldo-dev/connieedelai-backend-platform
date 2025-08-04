"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const userRoute = express_1.default.Router();
// userRoute
// 	.route("/")
// 	.get(isAuthorized, userControllers.get_user_all)
// 	.post(isAuthorized, userControllers.post_user);
// userRoute
// 	.route("/:id")
// 	.get(isAuthorized, userControllers.get_user)
// 	.put(isAuthorized, userControllers.put_user)
// 	.delete(isAuthorized, userControllers.delete_user);
userRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.userControllers.get_user_all)
    .post(auth_1.isAuthorized, controllers_1.userControllers.post_user);
userRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.userControllers.get_user)
    .put(auth_1.isAuthorized, controllers_1.userControllers.put_user)
    .delete(auth_1.isAuthorized, controllers_1.userControllers.delete_user);
userRoute
    .route("/generatePassword/:cantidad")
    .get(controllers_1.userControllers.generatePassword);
userRoute
    .route("/byname")
    .post(controllers_1.userControllers.post_user_by_email);
userRoute
    .route("/byrol/:id_rol")
    .get(auth_1.isAuthorized, controllers_1.userControllers.get_user_by_rol);
exports.default = userRoute;
//# sourceMappingURL=userRoute.js.map