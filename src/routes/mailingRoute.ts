import express from "express";
import mailingController from "../controllers/mailingController";

const mailingRoute = express.Router();

mailingRoute.route("/select-plan").post(mailingController.send_select_plan);
mailingRoute.route("/send-mass-email").post(mailingController.send_mass_email);

export default mailingRoute;
