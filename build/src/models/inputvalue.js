"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "input_value";
const Inputvalue = connection.define(modelName, {
    id_user_local: { type: DataTypes.INTEGER },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.STRING },
    obs: { type: DataTypes.STRING },
    clasification_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE },
    report_id: { type: DataTypes.STRING },
    score: { type: DataTypes.NUMBER }
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Inputvalue;
//# sourceMappingURL=inputvalue.js.map