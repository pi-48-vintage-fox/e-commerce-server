'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Fill Your Name'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Fill Your Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Fill Your Password'
        }
      }
    },
    profpic: DataTypes.STRING,
    role:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Fill Your Role'
        }
      }
    },
  }, {
    hooks:{
      beforeCreate(user){
        user.password=bcrypt.hashSync(user.password,10)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};