"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contentService_1 = __importDefault(require("../services/contentService"));
const get_content_all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content(req, res, next);
});
const post_content = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.post_content(req, res, next);
});
const get_content = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_by_id(req, res, next);
});
const put_content_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.put_content_by_id(req, res, next);
});
const get_content_by_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_by_section(req, res, next);
});
const get_content_training = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_training(req, res, next);
});
const get_content_nutrition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_nutrition(req, res, next);
});
const get_content_training_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_training_by_id(req, res, next);
});
const get_content_nutrition_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.get_content_nutrition_by_id(req, res, next);
});
const post_content_with_upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.post_content_with_upload(req, res, next);
});
const generate_upload_url = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.generate_upload_url(req, res, next);
});
const delete_content_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.delete_content_by_id(req, res, next);
});
const convert_content_to_hls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentService_1.default.convert_content_to_hls(req, res, next);
});
exports.default = {
    get_content_all,
    post_content,
    get_content,
    put_content_by_id,
    get_content_training,
    get_content_nutrition,
    get_content_training_by_id,
    get_content_nutrition_by_id,
    post_content_with_upload,
    delete_content_by_id,
    generate_upload_url,
    get_content_by_section,
    convert_content_to_hls
};
//# sourceMappingURL=contentController.js.map