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
      Product.belongsTo(models.Category, {
        targetKey: "id",
        foreignKey: "CategoryId"
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image_url required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price required"
        },
        isInt: {
          msg: "Price must be number"
        },
        min: {
          args: [0],
          msg: "Price must be greater than 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock required"
        },
        isNumeric: {
          msg: "Stock must be number"
        },
        min: {
          args: [0],
          msg: "Stock must be greater than 0"
        }
      }
    },
    CategoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Category is Required",
        },
        min: {
          args: 1,
          msg: "Category id must be greater than 0",
        },
        isNumeric: {
          msg: "Category id must be number"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};