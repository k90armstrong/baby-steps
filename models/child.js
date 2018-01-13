module.exports = function(sequelize, Sequelize) {
    
    var Child = sequelize.define('child', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return Child;
}   
