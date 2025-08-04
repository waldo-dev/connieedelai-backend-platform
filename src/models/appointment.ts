import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IAppointments {
  id?: number;
  client_id: number;
  admin_id: number;
  date: Date;
  time: Date;
  end: Date;
  status: string;
  title: string;
  createdAt: Date;
}

interface IAppointmentsDB extends Model {
  id?: number;
  client_id: number;
  admin_id: number;
  date: Date;
  time: Date;
  end: Date;
  status: string;
  title: string;
  createdAt: Date;
}

const modelName = "appointments";

const Appointments = connection.define<IAppointmentsDB>(
  modelName,
  {
    client_id: { type: DataTypes.NUMBER, allowNull: false },
    admin_id: { type: DataTypes.NUMBER, allowNull: true,},
    date: { type: DataTypes.DATE, allowNull: true,},
    time: { type: DataTypes.DATE, allowNull: true,},
    end: { type: DataTypes.DATE, allowNull: true,},
    status: { type: DataTypes.STRING, allowNull: true,},
    title: { type: DataTypes.STRING, allowNull: true,},
    createdAt: { type: DataTypes.DATE, allowNull: true,},
    },
  {
    modelName: modelName,
    tableName: modelName,
    createdAt: true,
    updatedAt: false,
    freezeTableName: true,
  }
);

export { Appointments as default, IAppointmentsDB , IAppointments };
