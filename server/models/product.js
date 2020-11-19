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
      Product.hasMany(models.Cart)

    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Name cannot be empty!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          message: "Must be format url"
        },
        notEmpty: {
          message: "Image cannot be empty!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          message: "The price should not be less than 0."
        },
        notEmpty: {
          message: "Price cannot be empty!"
        },
        isNumeric: {
          message: 'Must be format number'
        }
      }

    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          message: "The stock should not be less than 0."
        },
        notEmpty: {
          message: "Stock cannot be empty!"
        },
        isNumeric: {
          message: 'Must be format number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};