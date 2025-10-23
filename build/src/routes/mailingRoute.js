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
mailingRoute.route("/send-welcome-platform").post(mailingController_1.default.send_welcome_platform);
mailingRoute.route("/send-admin-new-subscription").post(mailingController_1.default.send_admin_new_subscription);
exports.default = mailingRoute;
//# sourceMappingURL=mailingRoute.js.map