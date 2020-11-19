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
      Product.belongsToMany(models.User,{
        through: models.Cart,
        foreignKey: 'ProductId'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          args: true,
          msg : 'Price must be a number'
        },
        min : {
          args : [0],
          msg : 'Price cannot be negative value'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          args: true,
          msg : 'Stock must be a number'
        },
        min : {
          args : [0],
          msg : 'Stock cannot be negative value'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};