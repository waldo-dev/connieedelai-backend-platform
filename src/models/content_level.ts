import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IContentLevel {
  id?: number;
  content_id: number;
  level_id: number;
}

interface IContentLevelDB extends Model {
  id?: number;
  content_id: number;
  level_id: number;
}

const modelName = "content_level";

const ContentLevels = connection.define<IContentLevelDB>(
  modelName,
  {
    content_id: { type: DataTypes.NUMBER, allowNull: false },
    level_id: { type: DataTypes.NUMBER, allowNull: true,},
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { ContentLevels as default, IContentLevelDB, IContentLevel };
