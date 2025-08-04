"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertController_1 = __importDefault(require("../controllers/alertController"));
const authRoute = express_1.default.Router();
authRoute.route("/").get(alertController_1.default.get_alert);
exports.default = authRoute;
//# sourceMappingURL=alertRoute.js.map