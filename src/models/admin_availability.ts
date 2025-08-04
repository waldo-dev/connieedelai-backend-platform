import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IAdminAvailability {
  id?: number;
  day_of_week: number;
  admin_id: number;
  start_time: Date;
  end_time: Date;
}

interface IAdminAvailabilityDB extends Model {
  id?: number;
  day_of_week: number;
  admin_id: number;
  start_time: Date;
  end_time: Date;
}

const modelName = "admin_availability";

const AdminAvailabilitys = connection.define<IAdminAvailabilityDB>(
  modelName,
  {
    day_of_week: { type: DataTypes.NUMBER, allowNull: false },
    admin_id: { type: DataTypes.NUMBER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: true,},
    end_time: { type: DataTypes.DATE, allowNull: true,},
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { AdminAvailabilitys as default, IAdminAvailabilityDB, IAdminAvailability };
