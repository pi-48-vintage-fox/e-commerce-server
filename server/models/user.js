'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        message: "Email already exists"
      },
      validate: {
        notEmpty: {
          message: "Email cannot be empty"
        },
        isEmail: {
          message: "Must be format email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, 
        validate: {
          notEmpty: true
      }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};