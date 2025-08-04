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
const inputvalueService_1 = __importDefault(require("../services/inputvalueService"));
const get_input_value = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.get_input_value(req, res, next);
});
const post_input_value = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.post_input_value(req, res, next);
});
const get_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.get_input_value_by_id(req, res, next);
});
const put_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.put_input_value_by_id(req, res, next);
});
const delete_input_value_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.delete_input_value_by_id(req, res, next);
});
const get_input_value_by_report_question = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.get_input_value_by_report_question(req, res, next);
});
const get_input_value_by_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputvalueService_1.default.get_input_value_by_report(req, res, next);
});
exports.default = {
    get_input_value,
    post_input_value,
    get_input_value_by_id,
    put_input_value_by_id,
    delete_input_value_by_id,
    get_input_value_by_report_question,
    get_input_value_by_report
};
//# sourceMappingURL=inputvalueController.js.map