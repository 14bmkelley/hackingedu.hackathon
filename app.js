// Express variables
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

// Custom session support
var sessionManager = require(__dirname + "/util/SessionManager");

// App settings
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", process.argv[2] || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(cookieParser());

// Database settings
mongoose.connect("mongodb://localhost/saltyrant");
var userModelLocation = __dirname + "/db/model/user";
var userSchema = require(userModelLocation)(mongoose.Schema);

var models = {
  "User": mongoose.model("User", userSchema)
};

// Route known urls
var renderLocation = __dirname + "/controllers/render";
var apiLocation = __dirname + "/controllers/api";
var renderRouter = require(renderLocation)(express.Router(), sessionManager, models);
var apiRouter = require(apiLocation)(express.Router(), sessionManager, models);

app.use("/", renderRouter);
app.use("/", apiRouter);
app.use("/", express.static(__dirname + "/public"));

// Route unknown urls
app.use(function(request, response) {
  if (request.cookies !== null) {
    sessionManager.authenticateSession(request.cookies["sid"], function(authUser) {
      response.render("error", {
        "title": "home",
        "user": authUser
      });
    });
  } else {
    response.render("error", {
      "title": "home",
      "user": null
    });
  }
});

// Export
module.exports = app;
