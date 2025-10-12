"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "mailing";
const Mailing = connection.define(modelName, {
    recipient_id: { type: DataTypes.NUMBER, allowNull: true },
    subject: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
});
exports.default = Mailing;
//# sourceMappingURL=mailing.js.map