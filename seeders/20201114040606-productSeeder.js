'use strict';

let products = [
  {
    name: "Product 1",
    image_url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    price: 50000,
    stock: 10,
    descriptions: "Hair shampoo good for your friends hair",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Product 2",
    image_url: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    price: 8000,
    stock: 10,
    descriptions: "Pepsi the ancient drinks",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Product 3",
    image_url: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1226&q=80",
    price: 30000,
    stock: 10,
    descriptions: "Jenuin a typo that brings fortune",
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
    await queryInterface.bulkInsert('Products',products)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products',null)
  }
};
