import { Model } from "sequelize";
import { generateHash, compareHash, isHash } from "../utils/bcrypt";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IUser {
	id?: number;
	name: string;
	lastname: string;
	email: string;
	password: string;
	active: boolean;
	role: string;
	createdAt: Date | string;
	updatedAt?: Date | string;
}

interface IUserDB extends Model {
	id?: number;
	name: string;
	lastname: string;
	email: string;
	password: string;
	active: boolean;
	role: string;
	createdAt: Date | string;
	updatedAt?: Date | string;
}

const modelName = "user";

const User = connection.define<IUserDB>(
	modelName,
	{
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: false },
		lastname: { type: DataTypes.STRING, allowNull: false },
		active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		role: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
	},
	{
		modelName: modelName,
		tableName: modelName,
		hooks: {
			afterValidate: (user: IUserDB) => {
				let currentPassword = user.password;
				if (!isHash(currentPassword))
					user.password = generateHash(currentPassword);
			},
		},
		updatedAt: false,
		createdAt: false,
		freezeTableName: true,
	}
);

// // METHODS
// User.prototype.comparePassword = function (password: string) {
// 	const user = this as IUserDB;
// 	return compareHash(password, user.password);
// };

export { User as default, IUserDB, IUser };
