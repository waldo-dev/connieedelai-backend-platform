"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentControllers = exports.sectionControllers = exports.moduleControllers = exports.contentControllers = exports.rolControllers = exports.userControllers = void 0;
// export { default } from "./userControllers";
var userController_1 = require("./userController");
Object.defineProperty(exports, "userControllers", { enumerable: true, get: function () { return __importDefault(userController_1).default; } });
var rolController_1 = require("./rolController");
Object.defineProperty(exports, "rolControllers", { enumerable: true, get: function () { return __importDefault(rolController_1).default; } });
var contentController_1 = require("./contentController");
Object.defineProperty(exports, "contentControllers", { enumerable: true, get: function () { return __importDefault(contentController_1).default; } });
var moduleController_1 = require("./moduleController");
Object.defineProperty(exports, "moduleControllers", { enumerable: true, get: function () { return __importDefault(moduleController_1).default; } });
var sectionController_1 = require("./sectionController");
Object.defineProperty(exports, "sectionControllers", { enumerable: true, get: function () { return __importDefault(sectionController_1).default; } });
var appointmentController_1 = require("./appointmentController");
Object.defineProperty(exports, "appointmentControllers", { enumerable: true, get: function () { return __importDefault(appointmentController_1).default; } });
//# sourceMappingURL=index.js.map