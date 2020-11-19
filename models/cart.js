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
      // define association here
    }
  };
  Cart.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(cart){
        cart.totalPrice = cart.quantity * cart.price
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};