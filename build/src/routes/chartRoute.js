"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chartController_1 = __importDefault(require("../controllers/chartController"));
const authRoute = express_1.default.Router();
authRoute.route("/").post(chartController_1.default.post_chartData);
exports.default = authRoute;
//# sourceMappingURL=chartRoute.js.map