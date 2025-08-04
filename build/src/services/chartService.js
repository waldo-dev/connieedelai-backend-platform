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
const report_1 = __importDefault(require("../models/report"));
const models_1 = require("../models");
const enums_1 = require("../utils/enums");
const post_chartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_local, dateFrom, dateTo } = req.body;
        let usuario;
        const userFind = yield models_1.User.findOne({
            where: {
                id: id_user,
            },
        });
        if (userFind) {
            usuario = userFind;
            let includeClause = [];
            let whereClause = {};
            if (usuario.rol_id === enums_1.rolEnum.Admin) {
                whereClause = { status_id: [enums_1.statusEnum.APROBADO], local_id: id_local };
            }
            if (usuario.rol_id === enums_1.rolEnum.Supervisor) {
                whereClause = {
                    status_id: [enums_1.statusEnum.APROBADO],
                    supervisor_id: id_user,
                    local_id: id_local,
                };
            }
            if (usuario.rol_id === enums_1.rolEnum.Auditor) {
                whereClause = {
                    status_id: [enums_1.statusEnum.APROBADO],
                    auditor_id: id_user,
                    local_id: id_local,
                };
            }
            if (usuario.rol_id === enums_1.rolEnum.Cliente) {
                whereClause = { status_id: [enums_1.statusEnum.APROBADO], local_id: id_local };
                includeClause.push({
                    model: models_1.Local,
                    required: true,
                    include: [
                        {
                            model: models_1.Userlocal,
                            required: true,
                            where: {
                                id_user: id_user,
                                id_local: id_local,
                            },
                        },
                    ],
                });
            }
            const report = yield report_1.default.findAll({
                where: whereClause,
                include: includeClause,
            });
            return res.status(200).json(report);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    post_chartData,
};
//# sourceMappingURL=chartService.js.map