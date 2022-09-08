const {Model, DataTypes, Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const Image = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });


// class Image extends Model {}

// Image.init( 
//   {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//     type: {
//         type: DataTypes.STRING,
//     },
//     name: {
//         type: DataTypes.STRING,
//     },
//     data: {
//         type: DataTypes.BLOB("long"),
//     },
//   }
// )


module.exports = Image;