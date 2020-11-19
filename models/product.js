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
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      validate:{        
        notEmpty:{
          msg: "Name is required"
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      validate:{
        isUrl:{
          msg: "Image Url must be an url"
        },
        notEmpty:{
          msg: "Image Url is required"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          msg: "Price must be a number"
        },
        min:{
          args:[1],
          msg: "Price must be greater than 0"
        },
        notEmpty:{
          msg: "Price is required"
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          msg: "Stock must be a number"
        },
        min:{
          args:[0],
          msg : "Stock must be greater than 0"
        },  
        notEmpty:{
          msg: "Stock is required"
        }
      }
    },
    descriptions: {
      type:DataTypes.TEXT,
      validate:{
        notEmpty:{
          msg: "Descriptions is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    
  });
  return Product;
};