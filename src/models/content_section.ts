import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IContentSection {
  id?: number;
  content_id: number;
  section_id: number;
}

interface IContentSectionDB extends Model {
  id?: number;
  content_id: number;
  section_id: number;
}

const modelName = "content_section";

const ContentSections = connection.define<IContentSectionDB>(
  modelName,
  {
    content_id: { type: DataTypes.NUMBER, allowNull: false },
    section_id: { type: DataTypes.NUMBER, allowNull: true,},
    },
  {
    modelName: modelName,
    tableName: modelName,
    updatedAt: false,
    createdAt: false,
    freezeTableName: false,
  }
);

export { ContentSections as default, IContentSectionDB, IContentSection };
