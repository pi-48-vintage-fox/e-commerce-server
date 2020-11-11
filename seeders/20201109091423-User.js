'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let passwordEncrypt = bcrypt.hashSync('1234', 10)
        let passwordEncryptCust = bcrypt.hashSync('4321', 10)
        await queryInterface.bulkInsert('Users', [{
            email: 'admin@mail.com',
            password: passwordEncrypt,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'customer@mail.com',
            password: passwordEncryptCust,
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};