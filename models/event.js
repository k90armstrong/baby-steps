module.exports = function(sequelize, Sequelize) {
    
    var Event = sequelize.define('event', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title:{
        	type: Sequelize.STRING

        },
        imageurl:{
        	type:Sequelize.STRING

        },
        description:{
        	type:Sequelize.STRING

        },
        story:{
        	type:Sequelize.STRING

        },
        date:{
        	type:Sequelize.DATE

        },
        


    });
    Event.associate = function(models) {
    // We're saying that a child should belong to an Event
    // A child can't be created without an Event due to the foreign key constraint
    Event.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    

    return Event;
}   
