import express from "express";
import { userControllers } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";

const userRoute = express.Router();

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
  .get(isAuthorized, userControllers.get_user_all)
  .post( userControllers.post_user);

userRoute
  .route("/:id")
  .get(isAuthorized, userControllers.get_user)
  .put(isAuthorized, userControllers.put_user)
  .delete(isAuthorized, userControllers.delete_user);

userRoute
  .route("/generatePassword/:cantidad")
  .get(userControllers.generatePassword);

userRoute
  .route("/byname")
  .post(userControllers.post_user_by_email)

userRoute
  .route("/byrol/:id_rol")
  .get(isAuthorized, userControllers.get_user_by_rol);

export default userRoute;
