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
const localService_1 = __importDefault(require("../services/localService"));
const get_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.get_local(req, res, next);
});
const post_local = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.post_local(req, res, next);
});
const put_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.put_local_by_id(req, res, next);
});
const delete_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.delete_local_by_id(req, res, next);
});
const get_local_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.get_local_by_id(req, res, next);
});
const post_local_by_nom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield localService_1.default.post_local_by_nom(req, res, next);
});
exports.default = {
    get_local,
    post_local,
    put_local_by_id,
    delete_local_by_id,
    get_local_by_id,
    post_local_by_nom
};
//# sourceMappingURL=localController.js.map