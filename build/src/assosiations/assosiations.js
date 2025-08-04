"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const assosiation = () => {
    // Usuario
    models_1.User.hasMany(models_1.Subscription, { foreignKey: "user_id" });
    models_1.Subscription.belongsTo(models_1.User, { foreignKey: "user_id" });
    models_1.User.hasMany(models_1.Payment, { foreignKey: "user_id" });
    models_1.Payment.belongsTo(models_1.User, { foreignKey: "user_id" });
    // Planes
    models_1.Plan.hasMany(models_1.Subscription, { foreignKey: "plan_id" });
    models_1.Subscription.belongsTo(models_1.Plan, { foreignKey: "plan_id" });
    models_1.Plan.belongsToMany(models_1.Module, {
        through: models_1.PlanModule,
        foreignKey: "plan_id",
        otherKey: "module_id",
    });
    models_1.Module.belongsToMany(models_1.Plan, {
        through: models_1.PlanModule,
        foreignKey: "module_id",
        otherKey: "plan_id",
    });
    // Contenidos
    models_1.Content.belongsToMany(models_1.Module, {
        through: models_1.ContentModule,
        foreignKey: "content_id",
        otherKey: "module_id",
    });
    models_1.Module.belongsToMany(models_1.Content, {
        through: models_1.ContentModule,
        foreignKey: "module_id",
        otherKey: "content_id",
    });
    models_1.Module.belongsToMany(models_1.Section, {
        through: models_1.ModuleSection,
        foreignKey: "module_id",
        otherKey: "section_id",
    });
    models_1.Section.belongsToMany(models_1.Module, {
        through: models_1.ModuleSection,
        foreignKey: "section_id",
        otherKey: "module_id",
    });
    models_1.Content.belongsToMany(models_1.Section, {
        through: models_1.ContentSection,
        foreignKey: "content_id",
        otherKey: "section_id",
    });
    models_1.Section.belongsToMany(models_1.Content, {
        through: models_1.ContentSection,
        foreignKey: "section_id",
        otherKey: "content_id",
    });
    models_1.Content.belongsToMany(models_1.Level, {
        through: models_1.ContentLevel,
        foreignKey: "content_id",
        otherKey: "level_id",
    });
    models_1.Level.belongsToMany(models_1.Content, {
        through: models_1.ContentLevel,
        foreignKey: "level_id",
        otherKey: "content_id",
    });
    // Citas
    models_1.AdminAvailability.belongsTo(models_1.User, { foreignKey: "admin_id" });
    models_1.User.hasMany(models_1.AdminAvailability, { foreignKey: "admin_id" });
    models_1.Appointment.belongsTo(models_1.User, { as: "client", foreignKey: "client_id" });
    models_1.Appointment.belongsTo(models_1.User, { as: "admin", foreignKey: "admin_id" });
    models_1.User.hasMany(models_1.Appointment, {
        as: "clientAppointments",
        foreignKey: "client_id",
    });
    models_1.User.hasMany(models_1.Appointment, {
        as: "adminAppointments",
        foreignKey: "admin_id",
    });
    // Métricas de visualización
    models_1.ViewedContent.belongsTo(models_1.User, { foreignKey: "user_id" });
    models_1.User.hasMany(models_1.ViewedContent, { foreignKey: "user_id" });
    models_1.ViewedContent.belongsTo(models_1.Content, { foreignKey: "content_id" });
    models_1.Content.hasMany(models_1.ViewedContent, { foreignKey: "content_id" });
};
exports.default = assosiation;
//# sourceMappingURL=assosiations.js.map