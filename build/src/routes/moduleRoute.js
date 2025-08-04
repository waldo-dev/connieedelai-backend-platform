"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const moduleRoute = express_1.default.Router();
moduleRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.moduleControllers.get_module)
    .post(auth_1.isAuthorized, upload_1.upload.single('file'), controllers_1.moduleControllers.post_module);
moduleRoute
    .route("/difficulty/:difficulty")
    .get(auth_1.isAuthorized, controllers_1.moduleControllers.get_modules_by_difficulty);
moduleRoute
    .route("/contents/:id")
    .get(auth_1.isAuthorized, controllers_1.moduleControllers.get_module_with_contents);
moduleRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.moduleControllers.get_module_by_id)
    .put(auth_1.isAuthorized, upload_1.upload.single('file'), controllers_1.moduleControllers.put_module_by_id)
    .delete(auth_1.isAuthorized, controllers_1.moduleControllers.delete_module);
exports.default = moduleRoute;
//# sourceMappingURL=moduleRoute.js.map