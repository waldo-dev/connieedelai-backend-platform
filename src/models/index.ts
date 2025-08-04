export { db } from "../config/index";
export { default as Label, ILabel, ILabelDB } from "./label";
export { default as User, IUser, IUserDB } from "./user";
export { default as AdminAvailability, IAdminAvailability, IAdminAvailabilityDB } from "./admin_availability";
export { default as Appointment, IAppointmentsDB, IAppointments, } from "./appointment";
export { default as ContentLevel, IContentLevel, IContentLevelDB } from "./content_level";
export { default as ContentModule, IContentModule, IContentModuleDB } from "./content_module";
export { default as ContentSection, IContentSection, IContentSectionDB } from "./content_section";
export { Content, IContent, IContentDB } from "./content";
export { default as Level, ILevel, ILevelDB } from "./level";
export { default as Meeting, IMeeting, IMeetingDB } from "./meeting";
export { default as Module, IModule, IModuleDB } from "./module";
export { default as Payment, IPayment, IPaymentDB } from "./payments";
export { default as PlanModule, IPlanModule, IPlanModuleDB } from "./plan_module";
export { default as Plan, IPlan, IPlanDB } from "./plan";
export { Section, ISection, ISectionDB } from "./section";
export { default as Subscription, ISubscription, ISubscriptionDB } from "./subscription";
export { default as ViewedContent, IViewedContent, IViewedContentDB } from "./viewed_contents";
export { ModuleSection, IModuleSectionDB } from "./module_section";

import assosiation from "../assosiations/assosiations";

assosiation();
