"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      size: DataTypes.STRING,
      totalPrice:  {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        }
      },
      quantity:  {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Tidak boleh memasukan angka minus dan minimal 0"
          }
        }
      },
      address:  {
        type: DataTypes.STRING
      },
      tracking: {
        type: DataTypes.STRING
      },
      wishlist: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
