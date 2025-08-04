import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IPlan {
  id?: number;
  name: string;
  description: string;
  duration: string;
  price: number;
  is_active: boolean;
}

interface IPlanDB extends Model {
  id?: number;
  name: string;
  description: string;
  duration: string;
  price: number;
  is_active: boolean;
}

const modelName = "plan";

const Plans = connection.define<IPlanDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true,},
    duration: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.NUMBER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: true },
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { Plans as default, IPlanDB, IPlan };
