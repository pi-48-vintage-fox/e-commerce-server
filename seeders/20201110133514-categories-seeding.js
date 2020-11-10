'use strict';

const categories = [
  {
    name: "Elektronik",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Game",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Fashion",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Handphone",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Komputer",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {})
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
    await queryInterface.bulkDelete('Categories', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
