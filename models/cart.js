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
        validate: {
          isIn: {
            args: [['new', 'checkout', 'paid', 'complete']],
            msg: "Valid status: 'new', 'checkout','paid','complete'",
          },
        },
      },
      grandTotalPrice: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  )

  Cart.beforeCreate((cart) => {
    cart.status = 'new'
  })
  return Cart
}
