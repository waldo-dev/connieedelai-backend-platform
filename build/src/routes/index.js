"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const rolRoute_1 = __importDefault(require("./rolRoute"));
const contentRoute_1 = __importDefault(require("./contentRoute"));
const moduleRoute_1 = __importDefault(require("./moduleRoute"));
const sectionRoute_1 = __importDefault(require("./sectionRoute"));
const appointmentRoute_1 = __importDefault(require("./appointmentRoute"));
const appRoute = express_1.default.Router();
appRoute.use("/auth", authRoute_1.default);
appRoute.use("/user", userRoute_1.default);
appRoute.use("/rol", rolRoute_1.default);
appRoute.use("/content", contentRoute_1.default);
appRoute.use("/module", moduleRoute_1.default);
appRoute.use("/section", sectionRoute_1.default);
appRoute.use("/appointment", appointmentRoute_1.default);
exports.default = appRoute;
//# sourceMappingURL=index.js.map