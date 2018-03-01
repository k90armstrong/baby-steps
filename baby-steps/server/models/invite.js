
module.exports = function(sequelize, DataTypes) {
  
  var Invite = sequelize.define('Invite', {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      message: {
          type: DataTypes.STRING
      },
      status: {
          type: DataTypes.STRING,
          allowNull:false,
          defaultValue: 'pending'
      },
      from: {
        type: DataTypes.STRING
      }
  });

  Invite.associate = function(models) {
      // Associating Event with Posts
      // When an Event is deleted, also delete any associated Posts
    Invite.belongsTo(models.User, {
      foreignKey: {
          allowNull: false
        }
    });
    Invite.belongsTo(models.Family, {
      foreignKey: {
          allowNull: false
        }
    });
  };

  return Invite;
};   
