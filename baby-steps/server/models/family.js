
module.exports = function(sequelize, DataTypes) {
  
  var Family = sequelize.define('Family', {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
    //   imageUrl: {
    //       type: DataTypes.STRING,
    //       allowNull: true
    //   }
  });

  Family.associate = function(models) {
      // Associating Event with Posts
      // When an Event is deleted, also delete any associated Posts
      Family.hasMany(models.Child, {
          onDelete: "cascade"
      });
      Family.belongsToMany(models.User, {
        onDelete: "cascade",
        through: 'UserFamily'
      });
      Family.hasMany(models.Invite, {
        onDelete: "cascade"
      });
      Family.hasMany(models.Privilege, {
        onDelete: "cascade"
      });

  };
  return Family;
};   