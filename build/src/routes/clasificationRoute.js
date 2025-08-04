"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const clasificationRoute = express_1.default.Router();
clasificationRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.clasificationController.get_clasification)
    .post(auth_1.isAuthorized, controllers_1.clasificationController.post_clasification);
clasificationRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.clasificationController.get_clasification_by_id)
    .put(auth_1.isAuthorized, controllers_1.clasificationController.put_clasification_by_id)
    .delete(auth_1.isAuthorized, controllers_1.clasificationController.delete_clasification_by_id);
exports.default = clasificationRoute;
//# sourceMappingURL=clasificationRoute.js.map