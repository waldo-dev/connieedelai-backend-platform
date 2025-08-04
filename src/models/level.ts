import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface ILevel {
  id?: number;
  name: string;
}

interface ILevelDB extends Model {
  id?: number;
  name: string;
}

const modelName = "levels";

const Levels = connection.define<ILevelDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { Levels as default, ILevelDB, ILevel };
