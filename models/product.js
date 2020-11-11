'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory)
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Product name cannot be empty',
          },
          notEmpty: {
            msg: 'Product name cannot be empty',
          },
        },
      },
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      imageId: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'Price must be of numeric type',
          },
          min: {
            args: [0],
            msg: 'Price cannot be less than 0',
          },
          notNull: {
            msg: 'Product price cannot be empty',
          },
          notEmpty: {
            msg: 'Product price cannot be empty',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'Product stock must be of numeric type',
          },
          min: {
            args: [0],
            msg: 'Product stock cannot be less than 0',
          },
          notNull: {
            msg: 'Product stock cannot be empty',
          },
          notEmpty: {
            msg: 'Product stock cannot be empty',
          },
        },
      },
      ProductCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  )
  return Product
}
