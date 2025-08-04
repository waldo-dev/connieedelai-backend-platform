"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "meetings";
const Meeting = connection.define(modelName, {
    client_id: { type: DataTypes.NUMBER, allowNull: false },
    coach_id: { type: DataTypes.NUMBER, allowNull: true, },
    schedule_at: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: true,
    createdAt: true,
    freezeTableName: true,
});
exports.default = Meeting;
//# sourceMappingURL=meeting.js.map