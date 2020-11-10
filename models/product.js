'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Input Your Product Name'
        }
      }
    },
    image_url:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please Specify your Product Image to make your product standout'
        }
      }
    },
    price: {
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Please Specify Your Product Price'
        },
        min:{
          args:0,
          msg:'Please Ensure You Have a Valid Price Range'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:'Please Specify Your Product Stock'
        },
        min:{
          args:0,
          msg:'Please Ensure You Have a Valid Product Stock'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};