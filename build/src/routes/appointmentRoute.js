"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const appointmentRoute = express_1.default.Router();
appointmentRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.appointmentControllers.get_appointment_all)
    .post(auth_1.isAuthorized, controllers_1.appointmentControllers.post_appointment);
appointmentRoute
    .route("/by-id/:id")
    .put(auth_1.isAuthorized, controllers_1.appointmentControllers.put_appointment);
appointmentRoute
    .route("/by-client/:id")
    .get(auth_1.isAuthorized, controllers_1.appointmentControllers.get_appointment_by_client_id);
exports.default = appointmentRoute;
//# sourceMappingURL=appointmentRoute.js.map