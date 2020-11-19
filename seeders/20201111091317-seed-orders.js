"use strict";

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
    // const data = [
    //   {
    //     UserId: 1,
    //     ProductId: 1,
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     UserId: 1,
    //     ProductId: 3,
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     UserId: 2,
    //     ProductId: 1,
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     UserId: 2,
    //     ProductId: 2,
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     UserId: 2,
    //     ProductId: 3,
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ];
    // queryInterface.bulkInsert("Orders", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // queryInterface.bulkDelete("Orders", null)

  },
};
