'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
   let data = [
     {
       email: "admin@mail.com",
       password: "$2a$10$EJAKQRIqMVqAaJg.cXvmEOKhx4LzZmPwNuETzTaral/.awOSdcf1S",
       role: "admin",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      email: "user@mail.com",
      password: "$2a$10$EJAKQRIqMVqAaJg.cXvmEOKhx4LzZmPwNuETzTaral/.awOSdcf1S",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
     }

   ]
   return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete("User", null, {})
  }
};
