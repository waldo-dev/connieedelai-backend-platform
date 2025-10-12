import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IMailing {
  id?: number;
  recipient_id: number;
  subject: string;
  message: string;
  createdAt: Date;
}

interface IMailingDB extends Model {
  id?: number;
  recipient_id: number;
  subject: string;
  message: string;
  createdAt: Date;
}

const modelName = "mailing";

const Mailing = connection.define<IMailingDB>(
  modelName,
  {
    recipient_id: { type: DataTypes.NUMBER, allowNull: true },
    subject: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING, allowNull: true },
  },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: true,
    freezeTableName: true,
  }
);

export { Mailing as default, IMailingDB, IMailing };
