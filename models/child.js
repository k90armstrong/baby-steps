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
        weight: {
            type: Sequelize.DECIMAL,
            allowNull: false

        },
        height: {
            type:Sequelize.DECIMAL
        },
        hospitalborn:{
            type: Sequelize.STRING
        },
        stateborn:{
            type: Sequelize.STRING
        }
        category:{
            type:Sequelize.STRING
        }
        birthdate:{
            type:Sequelize.DATE
        }
    });

    Child.associate = function(models) {
    // Associating Event with Posts
    // When an Event is deleted, also delete any associated Posts
    Child.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };
     

    return Child;
}   
