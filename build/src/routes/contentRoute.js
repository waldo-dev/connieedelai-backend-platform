"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../src/controllers");
const auth_1 = require("../middleware/auth");
const contentRoute = express_1.default.Router();
// contentRoute
//   .route("/")
//   .get(isAuthorized, contentControllers.get_content_all)
//   .post(isAuthorized,  upload.fields([
//   { name: "prev_url", maxCount: 1 },
// ]), contentControllers.post_content_with_upload);
contentRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_all)
    .post(auth_1.isAuthorized, controllers_1.contentControllers.post_content_with_upload);
contentRoute
    .route("/signedUrl")
    .post(auth_1.isAuthorized, controllers_1.contentControllers.generate_upload_url);
contentRoute.route("/training")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_training);
contentRoute.route("/training/:id")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_training_by_id);
contentRoute.route("/nutrition")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_nutrition);
contentRoute.route("/nutrition/:id")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_nutrition_by_id);
contentRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content)
    .put(auth_1.isAuthorized, controllers_1.contentControllers.put_content_by_id)
    .delete(auth_1.isAuthorized, controllers_1.contentControllers.delete_content_by_id);
contentRoute.route("/section/:id")
    .get(auth_1.isAuthorized, controllers_1.contentControllers.get_content_by_section);
contentRoute.route("/:id/convert-to-hls")
    .post(auth_1.isAuthorized, controllers_1.contentControllers.convert_content_to_hls);
exports.default = contentRoute;
//# sourceMappingURL=contentRoute.js.map