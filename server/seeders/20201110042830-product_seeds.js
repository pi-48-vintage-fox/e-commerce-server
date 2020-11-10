'use strict';

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
   await queryInterface.bulkInsert('Products', [
    {
      name: 'Vans Old Skool',
      image_url: 'shorturl.at/aexDN',
      price: 850000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Nike Air Max',
      image_url: 'shorturl.at/vAHX7',
      price: 2500000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Converse All Star',
      image_url: 'shorturl.at/pqJKW',
      price: 600000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Onitsuka Tiger',
      image_url: 'shorturl.at/djCDH',
      price: 1300000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
