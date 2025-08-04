"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const inputvalueRoute = express_1.default.Router();
inputvalueRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.inputvalueController.get_input_value)
    .post(auth_1.isAuthorized, controllers_1.inputvalueController.post_input_value);
inputvalueRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.inputvalueController.get_input_value_by_id)
    .put(auth_1.isAuthorized, controllers_1.inputvalueController.put_input_value_by_id)
    .delete(auth_1.isAuthorized, controllers_1.inputvalueController.delete_input_value_by_id);
inputvalueRoute
    .route("/reportQuestion")
    .post(auth_1.isAuthorized, controllers_1.inputvalueController.get_input_value_by_report_question);
inputvalueRoute
    .route("/report/:id")
    .get(auth_1.isAuthorized, controllers_1.inputvalueController.get_input_value_by_report);
exports.default = inputvalueRoute;
//# sourceMappingURL=inputvalueRoute.js.map