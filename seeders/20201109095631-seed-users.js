'use strict'

const bcrypt = require('bcrypt')
const { User } = require('../models')

let users = [
  {
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin',
  },
  {
    email: 'budi@mail.com',
    password: '123',
    role: 'customer',
  },
]

users.forEach((user) => {
  user.createdAt = new Date()
  user.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const user = await User.bulkCreate(users)
      console.log('user:', user)
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
