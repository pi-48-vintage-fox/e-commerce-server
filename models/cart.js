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
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    ProductId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
    gty: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type:  DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};