"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "section";
const Section = connection.define(modelName, {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: "section",
    timestamps: false,
    freezeTableName: true,
});
exports.Section = Section;
//# sourceMappingURL=section.js.map