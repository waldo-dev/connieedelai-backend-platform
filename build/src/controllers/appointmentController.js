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
const appointmentService_1 = __importDefault(require("../services/appointmentService"));
const get_appointment_all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointmentService_1.default.get_appointment(req, res, next);
});
const post_appointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointmentService_1.default.post_appointment(req, res, next);
});
const get_appointment_by_client_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointmentService_1.default.get_appointment_by_client_id(req, res, next);
});
const put_appointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointmentService_1.default.put_appointment_by_id(req, res, next);
});
exports.default = {
    get_appointment_all,
    post_appointment,
    get_appointment_by_client_id,
    put_appointment,
};
//# sourceMappingURL=appointmentController.js.map