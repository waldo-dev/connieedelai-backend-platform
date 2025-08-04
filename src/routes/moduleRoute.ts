import express from "express";
import { moduleControllers } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";
import {upload} from "../middleware/upload"; 

const moduleRoute = express.Router();

moduleRoute
  .route("/")
  .get(isAuthorized, moduleControllers.get_module)
  .post(isAuthorized, upload.single('file'), moduleControllers.post_module); 

  moduleRoute
  .route("/difficulty/:difficulty")
  .get(isAuthorized, moduleControllers.get_modules_by_difficulty)

moduleRoute
  .route("/contents/:id")
  .get(isAuthorized, moduleControllers.get_module_with_contents)

moduleRoute
  .route("/:id")
  .get(isAuthorized, moduleControllers.get_module_by_id)
  .put(isAuthorized, upload.single('file'), moduleControllers.put_module_by_id)
  .delete(isAuthorized, moduleControllers.delete_module)

export default moduleRoute;
