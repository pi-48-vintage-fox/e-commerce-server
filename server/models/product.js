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
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'product name is required!'
        }
      }
    },
    image_url: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
         notEmpty: {
           msg: 'url image is required'
         }
       }
    },
    price: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
       notEmpty: {
         msg: 'price is required!'
       },
       isNumeric: {
          args: true,
          msg: 'must be number'
       },
       min: {
         args: [0],
         msg: 'price must greater than 0'
       }
     }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'stock is required'
        },
        isNumeric: {
          args: true,
          msg: 'must be number'
        },
        min: {
          args: [0],
          msg: 'stock must greater than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};