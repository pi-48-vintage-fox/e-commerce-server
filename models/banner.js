'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};