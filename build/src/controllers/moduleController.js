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
const moduleService_1 = __importDefault(require("../services/moduleService"));
const get_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.get_module(req, res, next);
});
const post_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.post_module(req, res, next);
});
const get_module_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.get_module_by_id(req, res, next);
});
const put_module_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.put_module_by_id(req, res, next);
});
const get_module_with_contents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.get_module_with_contents(req, res, next);
});
const get_modules_by_difficulty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.get_modules_by_difficulty(req, res, next);
});
const delete_module = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moduleService_1.default.delete_module(req, res, next);
});
exports.default = {
    get_module,
    post_module,
    get_module_by_id,
    put_module_by_id,
    get_module_with_contents,
    get_modules_by_difficulty,
    delete_module
};
//# sourceMappingURL=moduleController.js.map