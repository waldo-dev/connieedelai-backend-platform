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
const get_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield report_1.default.findAll();
    if (!result)
        return res.status(500).json();
    return res.status(200).json(result);
});
const post_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const reportBuilded = report_1.default.build(data);
    const resultValidate = yield reportBuilded
        .validate()
        .catch((err) => err);
    if (resultValidate.errors)
        res.status(409).json(resultValidate.errors);
    const report = yield reportBuilded.save().catch((err) => ({ err }));
    if (report.err)
        res.status(409).json(report.err.errors);
    res.status(200).json(report);
});
const get_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const report = yield report_1.default.findByPk(id, {
        // include: [{
        //   model: Inputvalue
        // }]
        });
        //console.info("🚀 ~ report:", report);
        if (!report)
            return res.status(404).json("report not found");
        return res.status(200).json(report);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
const put_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = yield report_1.default.findByPk(id);
    const { refused, status_id } = req.body;
    console.log("status:" + dataPut.status_id);
    console.log("refused:" + dataPut.refused);
    if (!objectDB)
        return res.status(404).json("object not found");
    else {
        const objectUpdated = yield objectDB
            .update(dataPut)
            .catch((err) => ({ err }));
        if (objectUpdated.err) {
            const { errors } = objectUpdated.err;
            return res.status(404).json(errors);
        }
        else
            return res.status(200).json(objectUpdated);
    }
});
const delete_report_by_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const objectFounded = yield report_1.default.findByPk(id);
    if (!objectFounded)
        return res.status(404).json("object not found");
    else {
        const reportDeleted = yield objectFounded
            .destroy()
            .catch((err) => ({ err }));
        if (reportDeleted.err)
            return res.status(409).json(reportDeleted.err);
        else
            return res.status(200).json(objectFounded);
    }
});
const get_report_by_local_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const report = yield report_1.default.findAll({
        where: {
            local_id: id,
        },
        include: [
            { model: models_1.Local },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
const get_report_by_supervisor_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    /*console.log(
        "🚀 ~ file: reportService.ts:113 ~ constget_report_by_supervisor_id= ~ id:",
        id
    );*/
    const report = yield report_1.default.findAll({
        where: {
            supervisor_id: id,
        },
        include: [
            { model: models_1.Local },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
const get_report_by_supervisor_id_status = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.params;
    const report = yield report_1.default.findAll({
        where: {
            supervisor_id: id,
            status_id: status,
        },
        include: [
            { model: models_1.Local },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
const get_report_by_supervisor_id_historico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const report = yield report_1.default.findAll({
        where: {
            supervisor_id: id,
            status_id: [2, 3],
        },
        include: [
            { model: models_1.Local },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
const get_report_by_client_id_historico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const report = yield report_1.default.findAll({
        where: {
            // supervisor_id: id,
            status_id: [2, 3],
        },
        include: [
            {
                model: models_1.Local,
                required: true,
                include: [
                    {
                        model: models_1.Userlocal,
                        required: true,
                        where: {
                            // supervisor_id: id,
                            id_user: id,
                        },
                    },
                ],
            },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
const get_report_by_auditor_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const report = yield report_1.default.findAll({
        where: {
            auditor_id: id,
        },
        include: [
            { model: models_1.Local },
            { model: models_1.User, as: "Auditor" },
            { model: models_1.User, as: "Supervisor" },
        ],
        order: [
            ['id', 'DESC'],
        ]
    });
    if (!report)
        return res.status(404).json("report not found");
    return res.status(200).json(report);
});
exports.default = {
    get_report_by_id,
    put_report_by_id,
    get_report,
    post_report,
    delete_report_by_id,
    get_report_by_local_id,
    get_report_by_supervisor_id,
    get_report_by_auditor_id,
    get_report_by_supervisor_id_status,
    get_report_by_supervisor_id_historico,
    get_report_by_client_id_historico,
};
//# sourceMappingURL=reportService.js.map