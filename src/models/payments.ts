import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IPayment {
  id?: number;
  user_id: number;
  plan_id: number;
  amount: number;
  payment_method: string;
  status: string;
  paid_at: Date;
}

interface IPaymentDB extends Model {
  id?: number;
  user_id: number;
  plan_id: number;
  amount: number;
  payment_method: string;
  status: string;
  paid_at: Date;
}

const modelName = "payment";

const Payments = connection.define<IPaymentDB>(
  modelName,
  {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    plan_id: { type: DataTypes.NUMBER, allowNull: true },
    amount: { type: DataTypes.NUMBER, allowNull: true },
    payment_method: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    paid_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    modelName: modelName,
    tableName: modelName,
    freezeTableName: false,
  }
);

export { Payments as default, IPaymentDB, IPayment };
