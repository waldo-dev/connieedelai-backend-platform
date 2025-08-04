"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const reportRoute = express_1.default.Router();
reportRoute
    .route("/")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report)
    .post(auth_1.isAuthorized, controllers_1.reportController.post_report);
reportRoute
    .route("/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_id)
    .put(auth_1.isAuthorized, controllers_1.reportController.put_report_by_id)
    .delete(auth_1.isAuthorized, controllers_1.reportController.delete_report_by_id);
reportRoute
    .route("/local/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_local_id);
reportRoute
    .route("/auditor/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_auditor_id);
reportRoute
    .route("/supervisor/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_supervisor_id);
reportRoute
    .route("/supervisorHistorico/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_supervisor_id_historico);
reportRoute
    .route("/supervisor/:id/:status")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_supervisor_id_status);
reportRoute
    .route("/clienteHistorico/:id")
    .get(auth_1.isAuthorized, controllers_1.reportController.get_report_by_client_id_historico);
exports.default = reportRoute;
//# sourceMappingURL=reportRoute.js.map