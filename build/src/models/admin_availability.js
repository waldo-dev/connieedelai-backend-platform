"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "admin_availability";
const AdminAvailabilitys = connection.define(modelName, {
    day_of_week: { type: DataTypes.NUMBER, allowNull: false },
    admin_id: { type: DataTypes.NUMBER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: true, },
    end_time: { type: DataTypes.DATE, allowNull: true, },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = AdminAvailabilitys;
//# sourceMappingURL=admin_availability.js.map