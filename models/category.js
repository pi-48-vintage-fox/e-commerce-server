'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        sourceKey: "id",
        foreignKey: "CategoryId"
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category required"
        },
        notEmpty: {
          msg: "Category required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};