import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IMeeting {
  id?: number;
  client_id: number;
  coach_id: string;
  scheduled_at: Date;
  status: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

interface IMeetingDB extends Model {
  id?: number;
  client_id: number;
  coach_id: string;
  scheduled_at: Date;
  status: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

const modelName = "meetings";

const Meeting = connection.define<IMeetingDB>(
  modelName,
  {
    client_id: { type: DataTypes.NUMBER, allowNull: false },
    coach_id: { type: DataTypes.NUMBER, allowNull: true,},
    schedule_at: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: true,
    createdAt: true,
    freezeTableName: true,
  }
);

export { Meeting as default, IMeetingDB, IMeeting };
