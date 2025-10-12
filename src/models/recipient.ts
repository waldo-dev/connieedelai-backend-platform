import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IRecipient {
  id?: number;
  email: string;
  createdAt: Date;
}

interface IRecipientDB extends Model {
  id?: number;
  email: string;
  createdAt: Date;
}

const modelName = "recipient";

const Recipient = connection.define<IRecipientDB>(
  modelName,
  {
    email: { type: DataTypes.STRING, allowNull: false },
  },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
  }
);

export { Recipient as default, IRecipientDB, IRecipient };
