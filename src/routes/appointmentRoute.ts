import express from "express";
import { appointmentControllers } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";

const appointmentRoute = express.Router();

appointmentRoute
  .route("/")
  .get(isAuthorized, appointmentControllers.get_appointment_all)
  .post(isAuthorized, appointmentControllers.post_appointment)

appointmentRoute
  .route("/by-id/:id")
  .put(isAuthorized, appointmentControllers.put_appointment)
  
appointmentRoute
  .route("/by-client/:id")
  .get(isAuthorized, appointmentControllers.get_appointment_by_client_id)
  
export default appointmentRoute;
