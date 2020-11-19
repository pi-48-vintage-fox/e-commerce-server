'use strict';

const { query } = require("express");

let categories = [
  {
    name: 'Paper',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_1_370x497_crop_top.png?v=1547809580',
    link: '/category/paper',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Plastic',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_2_370x497_crop_top.png?v=1547809583',
    link: '/category/plastic',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ribbon',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_3_370x497_crop_top.png?v=1547809585',
    link: '/category/ribbon',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Food',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_4_370x497_crop_top.png?v=1547809705',
    link: '/category/food',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Crafts',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_5_370x497_crop_top.png?v=1547809707',
    link: '/category/crafts',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Fabric',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/banner33_6_370x497_crop_top.png?v=1547809708',
    link: '/category/fabric',
    createdAt: new Date(),
    updatedAt: new Date()
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
   await queryInterface.bulkInsert('Categories',categories)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null)
  }
};
