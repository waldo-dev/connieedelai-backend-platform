"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const recipientRoute = express_1.default.Router();
recipientRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.recipientControllers.get_recipient)
    .post(controllers_1.recipientControllers.post_recipient);
recipientRoute
    .route("/by-email")
    .post(auth_1.isAuthorized, controllers_1.recipientControllers.get_recipient_by_email);
recipientRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.recipientControllers.get_recipient_by_id);
exports.default = recipientRoute;
//# sourceMappingURL=recipientRoute.js.map