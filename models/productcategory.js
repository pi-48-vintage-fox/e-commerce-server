'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.hasMany(models.Product)
      ProductCategory.hasMany(models.ProductCategory, {
        foreignKey: 'parentId',
      })
    }
  }
  ProductCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Product category name cannot be empty',
          },
          notEmpty: {
            msg: 'Product category name cannot be empty',
          },
        },
      },
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductCategory',
    }
  )
  return ProductCategory
}
