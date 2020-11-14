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
    }
  };
  Product.init({
    name: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      notNull: {
        args: true,
        msg: `Name is required.`
      },
      notEmpty: {
        args: true,
        msg: `Name cannot be empty.`
      }
     }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `image is required.`
        },
        isUrl: {
          args: true,
          msg:'Image must be URL format'
        },
        notEmpty: {
          args: true,
          msg: `Image cannot be empty.`
        }
      }
    },
    price: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
      notNull: {
        args: true,
        msg: `Price is required.`
      },
      isNumeric: {
        args: true,
        msg: `Price must be number format`
      },
      min: {
        args: 1,
        msg: `Price must be more than 0`
      },
      notEmpty: {
        args: true,
        msg: `Price cannot be empty.`
      }
     }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Stock is required.`
        },
        isNumeric: {
          args: true,
          msg: `Stock must be number format`
        },
        min: {
          args: 1,
          msg: `Stock must be more than 0`
        },
        notEmpty: {
          args: true,
          msg: `Stock cannot be empty.`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};