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
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Name is required' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'image_url is required' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric : {
          args: true,
          message: 'Price must be a number'
        },
        min: {
          args: [0],
          message: 'Price cannot be negative value'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric : {
          args: true,
          message: 'Stock must be a number'
        },
        min: {
          args: [0],
          message: 'Stock cannot be negative value'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};