'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(9)

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
         email: 'admin@admin.com',
         password: bcrypt.hashSync("admin", salt),
         role: 'admin',
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        email: 'customer@customer.com',
        password: bcrypt.hashSync("customer", salt),
        role: 'customer',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
