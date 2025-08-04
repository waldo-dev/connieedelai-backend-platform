"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "appointments";
const Appointments = connection.define(modelName, {
    client_id: { type: DataTypes.NUMBER, allowNull: false },
    admin_id: { type: DataTypes.NUMBER, allowNull: true, },
    date: { type: DataTypes.DATE, allowNull: true, },
    time: { type: DataTypes.DATE, allowNull: true, },
    end: { type: DataTypes.DATE, allowNull: true, },
    status: { type: DataTypes.STRING, allowNull: true, },
    title: { type: DataTypes.STRING, allowNull: true, },
    createdAt: { type: DataTypes.DATE, allowNull: true, },
}, {
    modelName: modelName,
    tableName: modelName,
    createdAt: true,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Appointments;
//# sourceMappingURL=appointment.js.map