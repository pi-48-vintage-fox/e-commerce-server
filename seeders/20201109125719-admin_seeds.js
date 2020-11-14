'use strict';

const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Admins', [
    {
      email: 'admin@mail.com',
      password: hashPassword('123456'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'hutamy@mail.com',
      password: hashPassword('123456'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
