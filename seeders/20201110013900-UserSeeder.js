'use strict';

const { makeHash } = require("../helpers/hash");

let users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: makeHash("qweqwe"),
    role : "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "User1",
    email: "user@test.com",
    password: makeHash("qweqwe"),
    role : "user",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
]
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
   await queryInterface.bulkInsert("Users",users)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users',null)
  }
};
