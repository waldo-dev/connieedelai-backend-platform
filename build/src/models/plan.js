"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "plan";
const Plans = connection.define(modelName, {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true, },
    duration: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.NUMBER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = Plans;
//# sourceMappingURL=plan.js.map