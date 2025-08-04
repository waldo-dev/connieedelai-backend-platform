"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "question";
const Question = connection.define(modelName, {
    value: { type: DataTypes.STRING, allowNull: false },
    clasification_id: { type: DataTypes.NUMBER }
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Question;
//# sourceMappingURL=question.js.map