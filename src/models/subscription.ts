import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface ISubscription {
  id?: number;
  user_id: number;
  plan_id: number;
  status: string;
  start_date: Date;
  end_date: Date;
  createdAt: Date;
}

interface ISubscriptionDB extends Model {
  id?: number;
  user_id: number;
  plan_id: number;
  status: string;
  start_date: Date;
  end_date: Date;
  createdAt: Date;
}

const modelName = "subscription";

const Subscriptions = connection.define<ISubscriptionDB>(
  modelName,
  {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    plan_id: { type: DataTypes.NUMBER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    start_date: { type: DataTypes.DATE, allowNull: true },
    end_date: { type: DataTypes.DATE, allowNull: true },
  },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
  }
);

export { Subscriptions as default, ISubscriptionDB, ISubscription };
