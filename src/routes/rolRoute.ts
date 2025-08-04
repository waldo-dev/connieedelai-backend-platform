import express from "express";
import { rolControllers } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const rolRoute = express.Router();

rolRoute
	.route("/")
	.get(isAuthorized, rolControllers.get_rol)
	.post(isAuthorized, rolControllers.post_rol);

rolRoute
	.route("/:id")
	.get(isAuthorized, rolControllers.get_rol_by_id)
	.put(isAuthorized, rolControllers.put_rol_by_id)
	.delete(isAuthorized, rolControllers.get_rol)
export default rolRoute;
