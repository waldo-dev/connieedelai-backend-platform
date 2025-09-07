import express from "express";
import { contentControllers } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";
import {upload} from "../middleware/upload"; 

const contentRoute = express.Router();

// contentRoute
//   .route("/")
//   .get(isAuthorized, contentControllers.get_content_all)
//   .post(isAuthorized,  upload.fields([
//   { name: "prev_url", maxCount: 1 },
// ]), contentControllers.post_content_with_upload);
  
contentRoute
  .route("/")
  .get(isAuthorized, contentControllers.get_content_all)
  .post(isAuthorized, contentControllers.post_content_with_upload);
  
contentRoute
  .route("/signedUrl")
  .post(isAuthorized, contentControllers.generate_upload_url);
  
  contentRoute.route("/training")
  .get(isAuthorized, contentControllers.get_content_training)
  
  contentRoute.route("/training/:id")
  .get(isAuthorized, contentControllers.get_content_training_by_id)
  
  contentRoute.route("/nutrition")
  .get(isAuthorized, contentControllers.get_content_nutrition)
  
  contentRoute.route("/nutrition/:id")
  .get(isAuthorized, contentControllers.get_content_nutrition_by_id)
  
  contentRoute
  .route("/:id")
  .get(isAuthorized, contentControllers.get_content)
  .put(isAuthorized, contentControllers.put_content_by_id)
  .delete(isAuthorized, contentControllers.delete_content_by_id)

  contentRoute.route("/section/:id")
  .get(isAuthorized, contentControllers.get_content_by_section)

export default contentRoute;
