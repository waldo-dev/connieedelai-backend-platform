"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "viewed_contents";
const ViewedContent = connection.define(modelName, {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    content_id: { type: DataTypes.NUMBER, allowNull: true, },
    viewed_at: { type: DataTypes.DATE, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = ViewedContent;
//# sourceMappingURL=viewed_contents.js.map