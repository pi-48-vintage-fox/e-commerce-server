'use strict';

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Admins', [
    {
     email: 'sample@gmail.com',
     password: hashPassword('sample123'),
     role: 'admin',
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      email: 'member@gmail.com',
      password: hashPassword('member123'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
     }

  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
