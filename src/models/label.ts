import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface ILabel {
  id?: number;
  name: string;
}

interface ILabelDB extends Model {
    id?: number;
    name: string;
}

const modelName = "label";

const Label = connection.define<ILabelDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);


export { Label as default, ILabelDB, ILabel };