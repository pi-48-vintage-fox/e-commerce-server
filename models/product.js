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
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, {
        through: models.Cart
      });
      Product.hasMany(models.Cart);
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name product required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL product required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    CategoryId: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};