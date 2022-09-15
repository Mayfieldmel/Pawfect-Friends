const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init( 
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.TEXT,
      },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    pet_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'image'
  }
)


module.exports = Image;