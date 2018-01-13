module.exports = function(sequelize, Sequelize) {
    
    var Event = sequelize.define('event', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    });
    return Event;
}   
