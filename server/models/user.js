'use strict';
const {
  Model
} = require('sequelize');
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: `Email is required!`
        },
        isEmail: {
          args: true,
          msg: `Email must be email format `
       }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: {
         args: true,
         msg: `Password is required.`
       }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notNull: {
         args: true,
         msg: `Role is required.`
       }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};