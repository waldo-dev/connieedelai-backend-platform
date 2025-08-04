"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleSection = void 0;
const config_1 = require("../config");
const { connection, DataTypes } = config_1.db;
const ModuleSection = connection.define("module_section", {
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    section_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "module_section",
    timestamps: false,
    freezeTableName: true,
});
exports.ModuleSection = ModuleSection;
//# sourceMappingURL=module_section.js.map