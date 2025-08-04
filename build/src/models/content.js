"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "content";
const Content = connection.define(modelName, {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    is_downloadble: { type: DataTypes.BOOLEAN, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    prev_url: { type: DataTypes.STRING, allowNull: true },
    week: { type: DataTypes.STRING, allowNull: true },
    visible: { type: DataTypes.BOOLEAN, allowNull: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: "content",
    timestamps: true,
    updatedAt: false,
    freezeTableName: true,
});
exports.Content = Content;
//# sourceMappingURL=content.js.map