"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "report";
const Report = connection.define(modelName, {
    administrator: { type: DataTypes.STRING },
    partner: { type: DataTypes.STRING },
    auditor_id: { type: DataTypes.NUMBER },
    supervisor_id: { type: DataTypes.NUMBER },
    local_id: { type: DataTypes.NUMBER },
    compliance: { type: DataTypes.STRING },
    compliance_standard: { type: DataTypes.STRING },
    status_id: { type: DataTypes.NUMBER },
    version: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
    refused: { type: DataTypes.STRING }
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Report;
//# sourceMappingURL=report.js.map