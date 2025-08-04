import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
var cors = require("cors");
var createError = require("http-errors");

import routes from "./src/routes/index";
// var logger = require("morgan");
// var bodyParser = require("body-parser");

var app = express();

app.use(express.json({ limit: '5gb' }));
app.use(express.urlencoded({ extended: true, limit: '5gb' }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
// app.use(passport.session());
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json(err.message);
});

export default app;
