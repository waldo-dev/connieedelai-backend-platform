"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const localRoute = express_1.default.Router();
localRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.localControllers.get_local)
    .post(auth_1.isAuthorized, controllers_1.localControllers.post_local);
localRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.localControllers.get_local_by_id)
    .put(auth_1.isAuthorized, controllers_1.localControllers.put_local_by_id)
    .delete(auth_1.isAuthorized, controllers_1.localControllers.delete_local_by_id);
localRoute
    .route("/byname")
    .post(controllers_1.localControllers.post_local_by_nom);
// localRoute
// 	.route("/local")
// 	.get(localControllers.get_local)
// 	.post(localControllers.post_local);
// localRoute
// 	.route("/local/:id")
// 	.get(localControllers.get_local_by_id)
// 	.put(localControllers.put_local_by_id)
// 	.delete(localControllers.delete_local_by_id);
exports.default = localRoute;
//# sourceMappingURL=localRoute.js.map