// 'use strict';

// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
// var db        = {};

// // if (config.use_env_variable) {
// //   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// //   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// // }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
// var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// varconfig    = require(__dirname + '/../config/config.json')[env];
var config = {
    "username": "oosygxzw76rnw8q3",
    "password": "bgj8h5bq99xv7mkr",
    "database": "i9irea1u9210lyhm",
    "host": "sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql",
    "port": "3306"
}

// var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

if (config.use_env_variable) {

  //var sequelize = new Sequelize(process.env[config.use_env_variable]);

  var sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {

  var sequelize = new Sequelize(config.database, config.username, config.password, config);

}


fs
   .readdirSync(__dirname)
   .filter(function(file) {
       return (file.indexOf(".") !== 0) && (file !== "index.js");
   })
   .forEach(function(file) {
       var model = sequelize.import(path.join(__dirname, file));
       db[model.name] = model;
   });

Object.keys(db).forEach(function(modelName) {
   if ("associate" in db[modelName]) {
       db[modelName].associate(db);
   }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;