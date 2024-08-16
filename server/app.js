require("dotenv").config();
require("express-async-errors");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // 存在 err.code 说明是业务异常, 设置 HTTP 状态码为 200
  if (err.code) {
    res.status(200);
  } else {
    res.status(err.status || 500);
  }

  res.json({ msg: err.message || err, code: err.code || 500 });
  // res.render("error");
});

module.exports = app;
