"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Order,
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name product is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Image product is required",
          },
        },
      },
      S: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size S product is required",
          },
        },
      },
      M: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size M product is required",
          },
        },
      },
      L: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size L product is required",
          },
        },
      },
      XL: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size XL product is required",
          },
        },
      },
      price:  {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price product is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
