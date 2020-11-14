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
   return queryInterface.bulkInsert('Products', [{
     name: 'iPhone 12 Pro',
     image_url: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-61263/iphone-12-pro-blue-hero.jpg',
     price: 20000000,
     stock: 300,
     createdAt: new Date(),
     updatedAt: new Date
   }])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', {}, null)
  }
};
