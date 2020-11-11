'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {}
  }
  Banner.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: 'Banner title cannot be empty',
          notEmpty: 'Banner title cannot be empty',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: 'Banner status cannot be empty',
          notEmpty: 'Banner status cannot be empty',
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: 'Banner image URL cannot be empty',
          notEmpty: 'Banner image URL cannot be empty',
        },
      },
      imageId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Banner',
    }
  )
  return Banner
}
