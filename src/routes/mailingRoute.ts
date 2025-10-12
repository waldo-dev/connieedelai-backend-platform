import express from "express";
import mailingController from "../controllers/mailingController";

const mailingRoute = express.Router();

mailingRoute.route("/select-plan").post(mailingController.send_select_plan);

export default mailingRoute;
