"use strict";
const { Model } = require("sequelize");
const { generateToken } = require("../helpers/jwt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: models.Order,
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Format must be an email",
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          min: {
            args: 4,
            msg: "Minimum character on password is 4",
          },
        },
      },
      image: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        // beforeCreate: (user, opt) => {
        //   user.password = generateToken(user.password)
        // }
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
