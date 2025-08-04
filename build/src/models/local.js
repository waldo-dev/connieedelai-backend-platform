"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const index_1 = require("../config/index");
const { connection, DataTypes } = index_1.db;
const modelName = "local";
const Local = connection.define(modelName, {
    fantasy_name: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    premium: { type: DataTypes.BOOLEAN, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    company_name: { type: DataTypes.STRING, allowNull: false },
    rut: { type: DataTypes.STRING, allowNull: false },
    num_auth_sani: { type: DataTypes.STRING },
    id_emp_admin: { type: DataTypes.INTEGER },
    client_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});
exports.default = Local;
//# sourceMappingURL=local.js.map