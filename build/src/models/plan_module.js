"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "plan_module";
const PlanModules = connection.define(modelName, {
    plan_id: { type: DataTypes.NUMBER, allowNull: false },
    module_id: { type: DataTypes.NUMBER, allowNull: true, },
    is_active: { type: DataTypes.BOOLEAN, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = PlanModules;
//# sourceMappingURL=plan_module.js.map