'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'UserId',
        sourceKey: 'id'
      })
      Cart.belongsTo(models.Product, {
        foreignKey: "ProductId",
        sourceKey: 'id'
      })
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "User Can't empty"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Product Can't empty"
        },
        min: {
          args: [1],
          msg: 'minimun 1 pcs'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Quantity Can't empty"
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};