'use strict';
const bcrypt = require('bcryptjs')

let data = 
[
  {
    "name":"Yulizar Widiatama",
    "email":"yulizarwidiatama@gmail.com",
    "password":bcrypt.hashSync('Tiramisu12',10),
    "role":"admin",
    "createdAt":new Date(),
    "updatedAt":new Date()
  },
  {
    "name":"Yudi Tama",
    "email":"yulizarwidiatama1@gmail.com",
    "password":bcrypt.hashSync('Tiramisu12',10),
    "role":"user",
    "createdAt":new Date(),
    "updatedAt":new Date()
  },
  {
    "name":"Ahri",
    "email":"ahri@gmail.com",
    "password":bcrypt.hashSync('Tiramisu12',10),
    "role":"user",
    "createdAt":new Date(),
    "updatedAt":new Date()
  },
  {
    "name":"Ezreal",
    "email":"ezreal@gmail.com",
    "password":bcrypt.hashSync('Tiramisu12',10),
    "role":"user",
    "createdAt":new Date(),
    "updatedAt":new Date()
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users',null)
  }
};
