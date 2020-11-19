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
     User.belongsToMany(models.Product, {
       through: models.Cart,
       foreignKey: 'UserId'
     }),
     User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty :{msg: 'Email is required'},
        isEmail : {msg: 'Must be an email format'},
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty :{msg: 'Password is required'},
        len: [6]
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};