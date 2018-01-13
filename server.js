// Require Modules
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var express    = require('express');
var sequelize  = require('sequelize');
// Create express app
var app = express();
var PORT = 3000;
 

// For Passport 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

//load passport strategies
require('./passport/passport.js')(passport, db.user);

// routes
require("./routes/api-routes.js")(app, passport);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});
  