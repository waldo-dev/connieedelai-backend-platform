"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailingController_1 = __importDefault(require("../controllers/mailingController"));
const mailingRoute = express_1.default.Router();
mailingRoute.route("/select-plan").post(mailingController_1.default.send_select_plan);
mailingRoute.route("/send-mass-email").post(mailingController_1.default.send_mass_email);
mailingRoute.route("/send-welcome-platform-ore").post(mailingController_1.default.send_welcome_platform_ore);
mailingRoute.route("/send-welcome-platform-plata").post(mailingController_1.default.send_welcome_platform_plata);
mailingRoute.route("/send-admin-new-subscription").post(mailingController_1.default.send_admin_new_subscription);
mailingRoute.route("/send-expiring-soon").post(mailingController_1.default.send_expiring_soon);
mailingRoute.route("/send-expired").post(mailingController_1.default.send_expired);
// Endpoints para verificación automática de suscripciones
mailingRoute.route("/check-expiring-subscriptions").post(mailingController_1.default.check_expiring_subscriptions);
mailingRoute.route("/check-expired-subscriptions").post(mailingController_1.default.check_expired_subscriptions);
mailingRoute.route("/check-all-subscription-notifications").post(mailingController_1.default.check_all_subscription_notifications);
exports.default = mailingRoute;
//# sourceMappingURL=mailingRoute.js.map