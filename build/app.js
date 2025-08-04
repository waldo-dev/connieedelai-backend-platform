"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors = require("cors");
var createError = require("http-errors");
const index_1 = __importDefault(require("./src/routes/index"));
// var logger = require("morgan");
// var bodyParser = require("body-parser");
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '5gb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '5gb' }));
app.use((0, cookie_parser_1.default)());
app.use(cors());
app.use(passport_1.default.initialize());
// app.use(passport.session());
app.use("/", index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json(err.message);
});
exports.default = app;
//# sourceMappingURL=app.js.map