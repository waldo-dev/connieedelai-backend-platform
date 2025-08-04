"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const sectionRoute = express_1.default.Router();
sectionRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.sectionControllers.get_section)
    .post(auth_1.isAuthorized, controllers_1.sectionControllers.post_section);
sectionRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.sectionControllers.get_section_by_id)
    .put(auth_1.isAuthorized, controllers_1.sectionControllers.put_section_by_id);
sectionRoute
    .route("/:id/modules")
    .get(auth_1.isAuthorized, controllers_1.sectionControllers.get_modules_by_section);
sectionRoute
    .route("/:id/contents-by-module")
    .get(auth_1.isAuthorized, controllers_1.sectionControllers.get_contents_by_section_grouped_by_module);
exports.default = sectionRoute;
//# sourceMappingURL=sectionRoute.js.map