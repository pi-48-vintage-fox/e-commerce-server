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
      CartProduct.belongsTo(models.Cart)
      CartProduct.belongsTo(models.Product)
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
          notNull: 'Cart item quantity is required',
          notEmpty: 'Cart item quantity is required',
          min: {
            args: [1],
            msg:
              'Quantity cannot be less than 1, use DELETE if you are trying to remove the item from the cart',
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
