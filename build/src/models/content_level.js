"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "content_level";
const ContentLevels = connection.define(modelName, {
    content_id: { type: DataTypes.NUMBER, allowNull: false },
    level_id: { type: DataTypes.NUMBER, allowNull: true, },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = ContentLevels;
//# sourceMappingURL=content_level.js.map