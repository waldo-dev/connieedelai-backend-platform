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
const authService_1 = __importDefault(require("../services/authService"));
const auth_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return authService_1.default.auth_login(req, res, next);
});
const auth_autorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return authService_1.default.auth_autorization(req, res, next);
});
exports.default = { auth_login, auth_autorization };
//# sourceMappingURL=authController.js.map