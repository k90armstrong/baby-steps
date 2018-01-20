// var Sequelize      = require('sequelize');
// var sequelize = new Sequelize('db', 'admin', 'pwd', {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql'
// });







module.exports = function(sequelize, DataTypes) {

    var Child = sequelize.define('Child', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        weight: {
            type: DataTypes.DECIMAL
        },
        height: {
            type: DataTypes.DECIMAL
        },
        hospitalborn:{
            type: DataTypes.STRING
        },
        stateborn:{
            type: DataTypes.STRING
        },
        category:{
            type: DataTypes.STRING
        },
        birthdate:{
            type: DataTypes.DATE
        },
        image:{
            type: DataTypes.STRING
        }
    });
    
    Child.associate = function(models) {
        // Associating Event with Posts
        // When an Event is deleted, also delete any associated Posts
        Child.hasMany(models.Event, {
            onDelete: "cascade"
        });
        Child.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          });
    };


return Child;

};  
