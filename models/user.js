'use strict';
const {
  Model
} = require('sequelize');
const { makeHash } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      unique: true,
      validate:{
        isEmail:{
          msg: "Must be email format"
        },
        notEmpty:{
          msg: "Email Is required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Password Is required"
        }
      }
    },
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Name Is required"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Role Is required"
        }
      }
    },
  }, {
    hooks:{
      beforeCreate(instance){
        instance.password = makeHash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};