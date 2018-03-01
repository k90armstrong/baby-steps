
module.exports = function(sequelize, DataTypes) {
  
  var Privilege = sequelize.define('Privilege', {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      status: {
          type: DataTypes.STRING,
          allowNull:false,
          defaultValue: 'active'
      }
  });

  Privilege.associate = function(models) {
      // Associating Event with Posts
      // When an Event is deleted, also delete any associated Posts
      Privilege.belongsTo(models.User,
        {
            foreignKey: {
              allowNull: false
            }
        });
      Privilege.belongsTo(models.Family,
        {
            foreignKey: {
              allowNull: false
            }
        });
  };

  return Privilege;
};   