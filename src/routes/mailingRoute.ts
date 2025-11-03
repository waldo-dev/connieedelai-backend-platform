import express from "express";
import mailingController from "../controllers/mailingController";

const mailingRoute = express.Router();

mailingRoute.route("/select-plan").post(mailingController.send_select_plan);
mailingRoute.route("/send-mass-email").post(mailingController.send_mass_email);
mailingRoute.route("/send-welcome-platform").post(mailingController.send_welcome_platform);
mailingRoute.route("/send-admin-new-subscription").post(mailingController.send_admin_new_subscription);
mailingRoute.route("/send-expiring-soon").post(mailingController.send_expiring_soon);
mailingRoute.route("/send-expired").post(mailingController.send_expired);

// Endpoints para verificación automática de suscripciones
mailingRoute.route("/check-expiring-subscriptions").post(mailingController.check_expiring_subscriptions);
mailingRoute.route("/check-expired-subscriptions").post(mailingController.check_expired_subscriptions);
mailingRoute.route("/check-all-subscription-notifications").post(mailingController.check_all_subscription_notifications);

export default mailingRoute;
