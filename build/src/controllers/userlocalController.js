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
const userlocalService_1 = __importDefault(require("../services/userlocalService"));
const get_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.get_user_local(req, res, next);
});
const post_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.post_user_local(req, res, next);
});
const put_user_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.put_user_local(req, res, next);
});
const delete_user_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.delete_user_local_by_id(req, res, next);
});
const get_user_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.get_user_local_by_id(req, res, next);
});
const get_local_by_userId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userlocalService_1.default.get_local_by_userId(req, res, next);
});
exports.default = {
    get_user_local,
    post_user_local,
    put_user_local,
    delete_user_local_by_id,
    get_user_local_by_id,
    get_local_by_userId
};
//# sourceMappingURL=userlocalController.js.map