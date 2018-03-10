module.exports = function(sequelize, DataTypes) {

    var Video = sequelize.define('Video', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        video:{
            type: DataTypes.STRING
        }
    });
        Video.associate = function(models) {
        // Associating Event with Posts
        // When an Event is deleted, also delete any associated Posts
        
        
        Video.belongsTo(models.Event, {
            foreignKey: {
              allowNull: false
            }
            
          });

    };


return Video;

};  