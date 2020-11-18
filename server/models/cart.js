'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Quantity cannot be empty!"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Status cannot be empty!"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "UserId cannot be empty!"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "ProductId cannot be empty!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(cart) {
        cart.status = 'Waiting for payment'
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};