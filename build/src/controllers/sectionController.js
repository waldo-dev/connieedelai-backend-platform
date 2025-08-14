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
const sectionService_1 = __importDefault(require("../services/sectionService"));
const get_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.get_section(req, res, next);
});
const post_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.post_section(req, res, next);
});
const get_section_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.get_section_by_id(req, res, next);
});
const put_section_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.put_section_by_id(req, res, next);
});
const get_contents_by_section_grouped_by_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.get_contents_by_section_grouped_by_module(req, res, next);
});
const get_modules_by_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.get_modules_by_section(req, res, next);
});
const get_bonus_by_section = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sectionService_1.default.get_modules_by_section(req, res, next);
});
exports.default = {
    get_section,
    post_section,
    get_section_by_id,
    put_section_by_id,
    get_contents_by_section_grouped_by_module,
    get_modules_by_section,
    get_bonus_by_section,
};
//# sourceMappingURL=sectionController.js.map