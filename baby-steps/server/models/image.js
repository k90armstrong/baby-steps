module.exports = function(sequelize, DataTypes) {

    var Image = sequelize.define('Image', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        url:{
            type: DataTypes.STRING
        }
      });
        Image.associate = function(models) {
        // Associating Event with Posts
        // When an Event is deleted, also delete any associated Posts
        
        Image.belongsTo(models.Child, {
            foreignKey: {
              allowNull: false
            }

          });
        Image.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
            
          });
        Image.belongsTo(models.Event, {
            foreignKey: {
              allowNull: false
            }
            
          });
    };


return Image;

};  