import {
  User,
  Subscription,
  Payment,
  Plan,
  PlanModule,
  Module,
  Content,
  Level,
  ContentLevel,
  Section,
  ContentSection,
  ContentModule,
  AdminAvailability,
  Appointment,
  ViewedContent,
  ModuleSection,
} from "../models";

const assosiation = () => {
  // Usuario
  User.hasMany(Subscription, { foreignKey: "user_id" });
  Subscription.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Payment, { foreignKey: "user_id" });
  Payment.belongsTo(User, { foreignKey: "user_id" });

  // Planes
  Plan.hasMany(Subscription, { foreignKey: "plan_id" });
  Subscription.belongsTo(Plan, { foreignKey: "plan_id" });

  Plan.belongsToMany(Module, {
    through: PlanModule,
    foreignKey: "plan_id",
    otherKey: "module_id",
  });
  Module.belongsToMany(Plan, {
    through: PlanModule,
    foreignKey: "module_id",
    otherKey: "plan_id",
  });

  // Contenidos
  Content.belongsToMany(Module, {
    through: ContentModule,
    foreignKey: "content_id",
    otherKey: "module_id",
  });

  Module.belongsToMany(Content, {
    through: ContentModule,
    foreignKey: "module_id",
    otherKey: "content_id",
  });

  Module.belongsToMany(Section, {
    through: ModuleSection,
    foreignKey: "module_id",
    otherKey: "section_id",
  });
  Section.belongsToMany(Module, {
    through: ModuleSection,
    foreignKey: "section_id",
    otherKey: "module_id",
  });

  Content.belongsToMany(Section, {
    through: ContentSection,
    foreignKey: "content_id",
    otherKey: "section_id",
  });

  Section.belongsToMany(Content, {
    through: ContentSection,
    foreignKey: "section_id",
    otherKey: "content_id",
  });
  Content.belongsToMany(Level, {
    through: ContentLevel,
    foreignKey: "content_id",
    otherKey: "level_id",
  });
  Level.belongsToMany(Content, {
    through: ContentLevel,
    foreignKey: "level_id",
    otherKey: "content_id",
  });

  // Citas
  AdminAvailability.belongsTo(User, { foreignKey: "admin_id" });
  User.hasMany(AdminAvailability, { foreignKey: "admin_id" });

  Appointment.belongsTo(User, { as: "client", foreignKey: "client_id" });
  Appointment.belongsTo(User, { as: "admin", foreignKey: "admin_id" });

  User.hasMany(Appointment, {
    as: "clientAppointments",
    foreignKey: "client_id",
  });
  User.hasMany(Appointment, {
    as: "adminAppointments",
    foreignKey: "admin_id",
  });

  // Métricas de visualización
  ViewedContent.belongsTo(User, { foreignKey: "user_id" });
  User.hasMany(ViewedContent, { foreignKey: "user_id" });

  ViewedContent.belongsTo(Content, { foreignKey: "content_id" });
  Content.hasMany(ViewedContent, { foreignKey: "content_id" });
};

export default assosiation;
