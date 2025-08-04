"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "payment";
const Payments = connection.define(modelName, {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    plan_id: { type: DataTypes.NUMBER, allowNull: true },
    amount: { type: DataTypes.NUMBER, allowNull: true },
    payment_method: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    paid_at: { type: DataTypes.DATE, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    freezeTableName: false,
});
exports.default = Payments;
//# sourceMappingURL=payments.js.map