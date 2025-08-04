import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IPlanModule {
  id?: number;
  plan_id: number;
  module_id: number;
  is_active: boolean;
}

interface IPlanModuleDB extends Model {
  id?: number;
  plan_id: number;
  module_id: number;
  is_active: boolean;
}

const modelName = "plan_module";

const PlanModules = connection.define<IPlanModuleDB>(
  modelName,
  {
    plan_id: { type: DataTypes.NUMBER, allowNull: false },
    module_id: { type: DataTypes.NUMBER, allowNull: true,},
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

export { PlanModules as default, IPlanModuleDB, IPlanModule };
