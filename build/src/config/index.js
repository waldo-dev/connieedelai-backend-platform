"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "production";
const config = require("./../config/config")[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
sequelize
    .authenticate()
    .then(() => {
    console.log("Database Connected => ", config.database);
})
    .catch((err) => {
    throw new Error(`SequelizeError:${err}`);
});
exports.db = {
    connection: sequelize,
    DataTypes: sequelize_1.DataTypes,
    Sequelize: sequelize_1.Sequelize,
};
//# sourceMappingURL=index.js.map