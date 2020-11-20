'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsToMany(models.User, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: "Product name cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Input price cannot be empty"
        },
        min:{
          args: [1],
          msg: "Price must bigger than zero"
        },
        isNumeric:{
          args: true,
          msg: "Price value must be a number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Input stock cannot be empty"
        },
        min: {
          args: [1],
          msg: "Minimum product stock is 1"
        },
        isNumeric: {
          args: true,
          msg: "Stock value must be a number"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Image URL cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};