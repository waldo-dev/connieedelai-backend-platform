import express from "express";
import { sectionControllers } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const sectionRoute = express.Router();

sectionRoute
  .route("/")
  .get(isAuthorized, sectionControllers.get_section)
  .post(isAuthorized, sectionControllers.post_section);
  
  sectionRoute
  .route("/:id")
  .get(isAuthorized, sectionControllers.get_section_by_id)
  .put(isAuthorized, sectionControllers.put_section_by_id);
  
  sectionRoute
    .route("/:id/modules")
    .get(isAuthorized, sectionControllers.get_modules_by_section)
  
  sectionRoute
    .route("/:id/modules/bonus")
    .get(isAuthorized, sectionControllers.get_modules_by_section)
  
  
  sectionRoute
    .route("/:id/contents-by-module")
    .get(isAuthorized, sectionControllers.get_contents_by_section_grouped_by_module)
  
export default sectionRoute;
