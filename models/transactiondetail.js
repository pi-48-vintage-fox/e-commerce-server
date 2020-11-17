'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionDetail.hasMany(models.Product)
      TransactionDetail.belongsTo(models.Transaction)
    }
  };
  TransactionDetail.init({
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    sub_total: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};