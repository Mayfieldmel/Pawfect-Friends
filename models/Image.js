const {Model, DataTypes, Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const Image = sequelize.define("image", {
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



module.exports = Image;