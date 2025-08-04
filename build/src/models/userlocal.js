"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userlocal = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "user_local";
const Userlocal = connection.define(modelName, {
    id_user: { type: DataTypes.NUMBER, allowNull: false },
    id_local: { type: DataTypes.NUMBER, allowNull: false },
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.Userlocal = Userlocal;
//# sourceMappingURL=userlocal.js.map