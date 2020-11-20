'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPassword
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required  "
        }
      }
    },
    full_name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        if (!user.role){
          user.role = "customer"
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};