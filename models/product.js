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
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        },
      },
      M: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size M product is required",
          },
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        },
      },
      L: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size L product is required",
          },
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        },
      },
      XL: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock size XL product is required",
          },
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        },
      },
      price:  {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price product is required"
          },
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
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
