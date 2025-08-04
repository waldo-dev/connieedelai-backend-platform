"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const rolRoute = express_1.default.Router();
rolRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.rolControllers.get_rol)
    .post(auth_1.isAuthorized, controllers_1.rolControllers.post_rol);
rolRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.rolControllers.get_rol_by_id)
    .put(auth_1.isAuthorized, controllers_1.rolControllers.put_rol_by_id)
    .delete(auth_1.isAuthorized, controllers_1.rolControllers.get_rol);
exports.default = rolRoute;
//# sourceMappingURL=rolRoute.js.map