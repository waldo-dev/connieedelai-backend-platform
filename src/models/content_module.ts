import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IContentModule {
  id?: number;
  content_id: number;
  module_id: number;
}

interface IContentModuleDB extends Model {
  id?: number;
  content_id: number;
  module_id: number;
}

const modelName = "content_module";

const ContentModules = connection.define<IContentModuleDB>(
  modelName,
  {
    content_id: { type: DataTypes.NUMBER, allowNull: false },
    module_id: { type: DataTypes.NUMBER, allowNull: true,},
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { ContentModules as default, IContentModuleDB, IContentModule };
