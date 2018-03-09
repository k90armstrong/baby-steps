// Require Modules
var passport = require("passport");
var session = require("express-session");
var express = require("express");
var path = require('path');
// var multer  =   require('multer');
var sequelize = require("sequelize");
var fileUpload = require("express-fileupload");

var env = require("dotenv").load();
// Create express app
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 5000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(fileUpload());

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static("baby-steps/client/build"));
}
// Routes
// =============================================================
// routes
var authRoute = require("./routes/auth.js")(app, passport);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./baby-steps/client/build/index.html"));
});
require("./routes/api-routes.js")(app, passport);
require("./routes/html-routes.js")(app, passport);

//load passport strategies
require("./passport/passport.js")(passport, db.User);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});
