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
const userService_1 = __importDefault(require("../services/userService"));
const get_user_all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.get_user_all(req, res, next);
});
const post_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.post_user(req, res, next);
});
const get_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.get_user_by_id(req, res, next);
});
const put_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.put_user(req, res, next);
});
const delete_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.delete_user(req, res, next);
});
const get_user_by_rol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.get_user_by_rol(req, res, next);
});
// const sendMailCreate = async (req: Request, res: Response) => {
// 	return await userService.sendMailCreate(req, res);
// };
const generatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.generatePassword(req, res, next);
});
const post_user_by_email = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userService_1.default.post_user_by_email(req, res, next);
});
exports.default = {
    get_user_all,
    post_user,
    get_user,
    put_user,
    delete_user,
    // sendMailCreate,
    generatePassword,
    post_user_by_email,
    get_user_by_rol,
};
//# sourceMappingURL=userController.js.map