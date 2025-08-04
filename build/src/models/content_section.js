"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "content_section";
const ContentSections = connection.define(modelName, {
    content_id: { type: DataTypes.NUMBER, allowNull: false },
    section_id: { type: DataTypes.NUMBER, allowNull: true, },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = ContentSections;
//# sourceMappingURL=content_section.js.map