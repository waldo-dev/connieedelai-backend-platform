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
const questionService_1 = __importDefault(require("../services/questionService"));
const get_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionService_1.default.get_question(req, res, next);
});
const post_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionService_1.default.post_question(req, res, next);
});
const put_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionService_1.default.put_question_by_id(req, res, next);
});
const delete_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionService_1.default.delete_question_by_id(req, res, next);
});
const get_question_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionService_1.default.get_question_by_id(req, res, next);
});
exports.default = {
    get_question,
    post_question,
    put_question_by_id,
    delete_question_by_id,
    get_question_by_id
};
//# sourceMappingURL=questionController.js.map