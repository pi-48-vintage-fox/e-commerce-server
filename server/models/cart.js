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
      Cart.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      Cart.belongsToMany(models.Product,{
        through: models.CartProduct,
        foreignKey: 'CartId'
      })
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks: {
        beforeCreate(instance) {
          instance.status = 'unpaid'
          console.log(instance.status, 'ini di hook');   
        }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};