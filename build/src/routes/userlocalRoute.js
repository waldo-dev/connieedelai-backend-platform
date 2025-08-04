"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const userlocalRoute = express_1.default.Router();
userlocalRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.userlocalController.get_user_local)
    .post(auth_1.isAuthorized, controllers_1.userlocalController.post_user_local);
userlocalRoute
    .route("/byUser/:id")
    .get(auth_1.isAuthorized, controllers_1.userlocalController.get_local_by_userId);
userlocalRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.userlocalController.get_user_local_by_id)
    .put(auth_1.isAuthorized, controllers_1.userlocalController.put_user_local)
    .delete(auth_1.isAuthorized, controllers_1.userlocalController.delete_user_local_by_id);
exports.default = userlocalRoute;
//# sourceMappingURL=userlocalRoute.js.map