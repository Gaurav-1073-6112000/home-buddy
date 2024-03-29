require("dotenv").config();
const MongoStore = require("connect-mongo");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var hbs = require("hbs");
// const serviceCategoryModel = require("./routes/serviceCategory");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//
var expressSession = require("express-session");
const passport = require("passport");
//
var indexRouter = require("./routes");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view engine", "ejs");
hbs.registerPartials("views/partials");
//
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "P_6112000_01",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_CONNECTION,
      touchAfter: 24 * 3600, // time period in seconds
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
//
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/static", express.static("public"));
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
  res.render("error");
});

module.exports = app;
