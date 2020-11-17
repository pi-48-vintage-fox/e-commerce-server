'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartProduct.init(
    {
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: 'CartId is required',
          notEmpty: 'CartId is required',
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: 'ProductId is required',
          notEmpty: 'ProductId is required',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: 'Cart product quantity is required',
          notEmpty: 'Cart product quantity is required',
          min: {
            args: [1],
            msg:
              'Quantity cannot be less than 1, use DELETE if you are trying to remove the product from the cart',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'CartProduct',
    }
  )
  return CartProduct
}
