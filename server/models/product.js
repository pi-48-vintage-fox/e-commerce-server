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
      Product.belongsToMany(models.User, { through: models.Cart })
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL cannot be empty!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be empty!"
        },
        min: {
          args: [0],
          msg: "Price cannot be a negative value!"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock cannot be empty!"
        },
        min: {
          args: [0],
          msg: "Stock cannot be a negative value!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};