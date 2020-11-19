'use strict';

const produk = [
  {
    name: 'Craftopia',
    image_url: 'https://steamcdn-a.akamaihd.net/steam/apps/1307550/header.jpg?t=1602802037',
    price: 200000,
    stock: 12,
    category: 'game',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name: 'Crusader Kings 3',
    image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/header.jpg?t=1602596444',
    price: 300000,
    stock: 20,
    category: 'game',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name: '99 Immersive Loading Screens',
    image_url: 'https://steamuserimages-a.akamaihd.net/ugc/1639829532748103187/3123C010505F20CAA54F09267F4433CFE2FB0643/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
    price: 5000,
    stock: 20,
    category: 'workshop',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name: 'Fall Guys',
    image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header_alt_assets_0.jpg?t=1603922857',
    price: 110000,
    stock: 20,
    category: 'game',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name: 'Fashion of the Abbasid Court',
    image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1296731/header.jpg?t=1598978763',
    price: 15000,
    stock: 20,
    category: 'dlc',
    createdAt : new Date(),
    updatedAt : new Date()
  },
]

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
    await queryInterface.bulkInsert("Products", produk,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {})
  }
};
