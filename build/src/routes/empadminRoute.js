"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const empAdminRoute = express_1.default.Router();
empAdminRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.empadminController.get_emp_admin)
    .post(auth_1.isAuthorized, controllers_1.empadminController.post_emp_admin);
empAdminRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.empadminController.get_emp_admin_by_id)
    .put(auth_1.isAuthorized, controllers_1.empadminController.put_emp_admin_by_id)
    .delete(auth_1.isAuthorized, controllers_1.empadminController.delete_emp_admin_by_id);
empAdminRoute
    .route("/byname")
    .post(auth_1.isAuthorized, controllers_1.empadminController.post_emp_admin_by_nom);
exports.default = empAdminRoute;
//# sourceMappingURL=empadminRoute.js.map