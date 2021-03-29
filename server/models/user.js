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
      User.hasMany(models.Cart, {
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'your input is not email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
        instance.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};