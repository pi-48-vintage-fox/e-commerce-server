'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'ProductId'
      })
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "name can't be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "image can't be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "price can't be empty"
        },
        isNumeric: {
          msg: "price mush be number"
        },
        min: {
          args: [0],
          msg: "price more than 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "stock can't be empty"
        },
        isNumeric: {
          msg: "stock mush be number"
        },
        min: {
          args: [0],
          msg: "stock more than 0"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
