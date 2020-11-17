'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartProduct)
    }
  }
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: 'UserId is required',
          notEmpty: 'UserId is required',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: 'Status is required',
          notEmpty: 'Status is required',
          isIn: [['new', 'paid', 'checkout', 'complete']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  )
  return Cart
}
