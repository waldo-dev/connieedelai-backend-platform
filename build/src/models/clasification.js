"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "clasification";
const Clasification = connection.define(modelName, {
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Clasification;
//# sourceMappingURL=clasification.js.map