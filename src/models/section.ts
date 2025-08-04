import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface ISection {
  id?: number;
  name: string;
  description?: string;
}

interface ISectionDB extends Model<ISection>, ISection {}

const modelName = "section";

const Section = connection.define<ISectionDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "section",
    timestamps: false,
    freezeTableName: true,
  }
);

export { Section, ISectionDB, ISection };
