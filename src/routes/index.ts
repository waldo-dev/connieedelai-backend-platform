import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import rolRoute from "./rolRoute";
import contentRoute from "./contentRoute";
import moduleRoute from "./moduleRoute";
import sectionRoute from "./sectionRoute";
import appointmentRoute from "./appointmentRoute";
import recipientRoute from "./recipientRoute";
import mailingRoute from "./mailingRoute";

const appRoute = express.Router();

appRoute.use("/auth", authRoute);
appRoute.use("/user", userRoute);
appRoute.use("/rol", rolRoute);
appRoute.use("/content", contentRoute);
appRoute.use("/module", moduleRoute);
appRoute.use("/section", sectionRoute);
appRoute.use("/appointment", appointmentRoute);
appRoute.use("/recipient", recipientRoute);
appRoute.use("/mailing", mailingRoute);

export default appRoute;
