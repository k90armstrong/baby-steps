// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads landing.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/landing.html"));
  });

  // users homepage route loads home.html
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/home.html"));
  });

  // childs profile page profile.html
  app.get("/profile/:name", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/profile.html"));
  });

};
