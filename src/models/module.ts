import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IModule {
  id?: number;
  name: string;
  description: string;
  type: string;
  is_downloadble: boolean;
  bonus: boolean;
  difficulty?: string;
  prev_url?: string;
  section_id: number;
}

interface IModuleDB extends Model {
  id?: number;
  name: string;
  description: string;
  type: string;
  is_downloadble: boolean;
  bonus: boolean;
  difficulty?: string;
  prev_url?: string;
  section_id: number;
}

const modelName = "module";

const Modules = connection.define<IModuleDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true,},
    type: { type: DataTypes.STRING, allowNull: true },
    is_downloadble: { type: DataTypes.BOOLEAN, allowNull: true },
    bonus: { type: DataTypes.BOOLEAN, allowNull: true },
    difficulty: { type: DataTypes.STRING, allowNull: true },
    prev_url: { type: DataTypes.STRING, allowNull: true },
    section_id: { type: DataTypes.NUMBER, allowNull: true },
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { Modules as default, IModuleDB, IModule };
