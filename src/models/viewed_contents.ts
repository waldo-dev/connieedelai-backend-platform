import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IViewedContent {
  id?: number;
  user_id: number;
  content_id: number;
  viewed_at: Date;
}

interface IViewedContentDB extends Model {
  id?: number;
  user_id: number;
  content_id: number;
  viewed_at: Date;
}

const modelName = "viewed_contents";

const ViewedContent = connection.define<IViewedContentDB>(
  modelName,
  {
    user_id: { type: DataTypes.NUMBER, allowNull: false },
    content_id: { type: DataTypes.NUMBER, allowNull: true,},
    viewed_at: { type: DataTypes.DATE, allowNull: true },
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { ViewedContent as default, IViewedContentDB, IViewedContent };
