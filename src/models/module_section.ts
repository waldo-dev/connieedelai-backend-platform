// models/moduleSection.ts
import { Model } from "sequelize";
import { db } from "../config";

const { connection, DataTypes } = db;

interface IModuleSectionDB extends Model {
  id?: number;
  module_id: number;
  section_id: number;
}

const ModuleSection = connection.define<IModuleSectionDB>(
  "module_section",
  {
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "module_section",
    timestamps: false,
    freezeTableName: true,
  }
);

export { ModuleSection, IModuleSectionDB };
