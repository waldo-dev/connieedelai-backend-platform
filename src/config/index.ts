"use strict";

import { Sequelize, DataTypes } from "sequelize";
import AWS from 'aws-sdk';

const env = process.env.NODE_ENV || "production";
const config = require("./../config/config")[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

sequelize
	.authenticate()
	.then(() => {
		console.log("Database Connected => ", config.database);
	})
	.catch((err) => {
		throw new Error(`SequelizeError:${err}`);
	});

export const db = {
	connection: sequelize,
	DataTypes,
	Sequelize: Sequelize,
};
