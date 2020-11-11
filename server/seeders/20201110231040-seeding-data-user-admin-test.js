'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
        email: "admin@mail.com",
        password: "qwerty",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        email: "admin2@mail.com",
        password: "qwerty",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        email: "admin3@mail.com",
        password: "qwerty",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null)
  }
};
