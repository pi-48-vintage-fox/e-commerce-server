'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Your email is wrong' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Email is required' },
        len: [6]
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(Admin) {
        Admin.password = hashPassword(Admin.password)
      }
    },
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};