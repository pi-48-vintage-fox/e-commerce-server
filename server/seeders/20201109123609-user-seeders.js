'use strict';
const { hashPassword } = require("../helpers/bcrypt");

const users = [
  {
    name: "Rizky Akhid",
    email: "riz@mail.id",
    password: hashPassword("hohoho"),
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Brody Hilman",
    email: "brody@mail.id",
    password: hashPassword("hehehe"),
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Admin Zheyenk",
    email: "adminz@mail.id",
    password: hashPassword("admindong"),
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)
  }
};
