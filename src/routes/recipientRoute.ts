import express from "express";
import { recipientControllers } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const recipientRoute = express.Router();

recipientRoute
	.route("/")
	.get(isAuthorized, recipientControllers.get_recipient)
	.post(recipientControllers.post_recipient);

  recipientRoute
	.route("/by-email")
  .post(isAuthorized, recipientControllers.get_recipient_by_email);

recipientRoute
	.route("/:id")
	.get(isAuthorized, recipientControllers.get_recipient_by_id)

export default recipientRoute;
