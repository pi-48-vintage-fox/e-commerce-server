'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Carts', 'UserId', {
      type: Sequelize.INTEGER, 
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addColumn('Carts', 'ProductId', {
      type: Sequelize.INTEGER, 
      references: {
        model: {
          tableName: 'Products'
        },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Carts', 'UserId')
    await queryInterface.removeColumn('Carts', 'ProductId')
  }
};
