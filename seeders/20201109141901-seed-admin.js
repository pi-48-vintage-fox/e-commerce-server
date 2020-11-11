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
    const data = [
      {
        name: "admin",
        email: "admin@mail.com",
        password: "$2b$10$QO7Ks3ZbjH4tI41E5zJYQOdzFdsSKhwNyAFSrch.hqvWGpKtPD766",
        image: null,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "rivari22",
        email: "rivari22@gmail.com",
        password: "rivari22",
        image: null,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    queryInterface.bulkInsert("Users", data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("Users", null, {});
  },
};
