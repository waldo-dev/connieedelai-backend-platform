"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "recipient";
const Recipient = connection.define(modelName, {
    email: { type: DataTypes.STRING, allowNull: false },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
});
exports.default = Recipient;
//# sourceMappingURL=recipient.js.map