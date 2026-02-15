import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IContent {
  id?: number;
  title: string;
  description?: string;
  type?: string;
  is_downloadble?: boolean;
  url?: string;
  hls_url?: string;
  prev_url?: string;
  week?: string;
  visible?: boolean;
  created_by?: number;
  conversion_status?: "pending" | "processing" | "completed" | "failed";
  file_size?: number;
  duration?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface IContentDB extends Model<IContent>, IContent {}

const modelName = "content";

const Content = connection.define<IContentDB>(
  modelName,
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    is_downloadble: { type: DataTypes.BOOLEAN, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    hls_url: { type: DataTypes.STRING, allowNull: true },
    prev_url: { type: DataTypes.STRING, allowNull: true },
    week: { type: DataTypes.STRING, allowNull: true },
    visible: { type: DataTypes.BOOLEAN, allowNull: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    conversion_status: {
      type: DataTypes.ENUM("pending", "processing", "completed", "failed"),
      allowNull: true,
      defaultValue: null,
    },
    file_size: { type: DataTypes.BIGINT, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "content",
    timestamps: true,
    updatedAt: false,
    freezeTableName: true,
  }
);

export { Content, IContentDB, IContent };
