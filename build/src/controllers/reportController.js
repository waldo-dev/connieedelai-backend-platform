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
const reportService_1 = __importDefault(require("../services/reportService"));
const get_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report(req, res, next);
});
const post_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.post_report(req, res, next);
});
const put_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.put_report_by_id(req, res, next);
});
const delete_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.delete_report_by_id(req, res, next);
});
const get_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_id(req, res, next);
});
const get_report_by_local_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_local_id(req, res, next);
});
const get_report_by_supervisor_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_supervisor_id(req, res, next);
});
const get_report_by_supervisor_id_status = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_supervisor_id_status(req, res, next);
});
const get_report_by_auditor_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_auditor_id(req, res, next);
});
const get_report_by_supervisor_id_historico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_supervisor_id_historico(req, res, next);
});
const get_report_by_client_id_historico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reportService_1.default.get_report_by_client_id_historico(req, res, next);
});
exports.default = {
    get_report,
    post_report,
    put_report_by_id,
    delete_report_by_id,
    get_report_by_id,
    get_report_by_local_id,
    get_report_by_supervisor_id,
    get_report_by_auditor_id,
    get_report_by_supervisor_id_status,
    get_report_by_supervisor_id_historico,
    get_report_by_client_id_historico,
};
//# sourceMappingURL=reportController.js.map