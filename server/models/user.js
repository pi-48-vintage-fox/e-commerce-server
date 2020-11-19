'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email must be email format."
        }
      }
    },
    password:DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate (user) {
        user.password = hashPassword(user.password)
        if (user.email === "admin@mail.com") {
          user.role = 'admin'
        } else {
          user.role = 'customer'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};