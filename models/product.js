'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'ProductId'
      })
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Name is required'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Image URL is required'},
        isUrl: {msg: 'Must be an URL format'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Price is required'},
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Stock is required'},
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};