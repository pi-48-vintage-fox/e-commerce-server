'use strict';

const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        email: 'yeska@mail.com',
        password: hashPassword('yeska', 10),
        full_name: 'Yeska Haganta',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'frans@mail.com',
        password: hashPassword('frans', 10),
        full_name: 'Frans Yoga',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};