import express from "express";
import mailingController from "../controllers/mailingController";

const mailingRoute = express.Router();

mailingRoute.route("/select-plan").post(mailingController.send_select_plan);
mailingRoute.route("/send-mass-email").post(mailingController.send_mass_email);
mailingRoute.route("/send-welcome-platform").post(mailingController.send_welcome_platform);
mailingRoute.route("/send-admin-new-subscription").post(mailingController.send_admin_new_subscription);

export default mailingRoute;
