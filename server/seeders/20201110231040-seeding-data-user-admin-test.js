'use strict';
const bcryptjs = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'admin',
        email: "admin@mail.com",
        password: bcryptjs.hashSync("qwerty", 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)
  }
};
