const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Imagecomment extends Model {}

Imagecomment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pet",
        key: "id",
      },
    },
    image_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "image",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "imagecomment",
  }
);

module.exports = Imagecomment;