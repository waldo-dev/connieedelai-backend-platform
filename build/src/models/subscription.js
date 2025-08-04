"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "subscription";
const Subscriptions = connection.define(modelName, {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    plan_id: { type: DataTypes.NUMBER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    start_date: { type: DataTypes.DATE, allowNull: true },
    end_date: { type: DataTypes.DATE, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
});
exports.default = Subscriptions;
//# sourceMappingURL=subscription.js.map