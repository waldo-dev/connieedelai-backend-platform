"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "module";
const Modules = connection.define(modelName, {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true, },
    type: { type: DataTypes.STRING, allowNull: true },
    is_downloadble: { type: DataTypes.BOOLEAN, allowNull: true },
    difficulty: { type: DataTypes.STRING, allowNull: true },
    prev_url: { type: DataTypes.STRING, allowNull: true },
    section_id: { type: DataTypes.NUMBER, allowNull: true },
}, {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
});
exports.default = Modules;
//# sourceMappingURL=module.js.map