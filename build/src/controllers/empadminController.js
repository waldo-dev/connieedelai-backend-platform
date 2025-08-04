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
const empadminService_1 = __importDefault(require("../services/empadminService"));
const get_emp_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.get_emp_admin(req, res, next);
});
const post_emp_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.post_emp_admin(req, res, next);
});
const put_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.put_emp_admin_by_id(req, res, next);
});
const delete_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.delete_emp_admin_by_id(req, res, next);
});
const get_emp_admin_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.get_emp_admin_by_id(req, res, next);
});
const post_emp_admin_by_nom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield empadminService_1.default.post_emp_admin_by_nom(req, res, next);
});
exports.default = {
    get_emp_admin,
    post_emp_admin,
    put_emp_admin_by_id,
    delete_emp_admin_by_id,
    get_emp_admin_by_id,
    post_emp_admin_by_nom
};
//# sourceMappingURL=empadminController.js.map