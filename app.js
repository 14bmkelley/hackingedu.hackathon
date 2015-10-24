// Express variables
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var sync = require("synchronize");

// Custom session support
var sessionManager = require(__dirname + "/util/SessionManager");

// App settings
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", process.argv[2] || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(cookieParser());
app.use(function(request, response, callback) {
  sync.fiber(callback);
});

// Route known urls
var renderLocation = __dirname + "/controllers/render";
var apiLocation = __dirname + "/controllers/api";
var renderRouter = require(renderLocation)(express.Router(), sessionManager);
var apiRouter = require(apiLocation)(express.Router(), sessionManager);

app.use("/", renderRouter);
app.use("/", apiRouter);
app.use("/", express.static(__dirname + "/public"));

// Route unknown urls
app.use(function(request, response) {
  response.render("error", {} );
});

// Export
module.exports = app;
