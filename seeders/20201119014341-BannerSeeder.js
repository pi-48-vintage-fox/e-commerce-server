'use strict';

let banners = [
  {
    name: 'Banner 1',
    caption: 'The Complete Packaging Supplies Store',
    sub_caption: 'WE OFFER PACKAGING OF ANY MATERIALS',
    link: '/categories',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/slide1_2048x755_crop_top.png?v=1547809197',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Banner 2',
    caption: 'Customized Packaging for Your Business',
    sub_caption: 'WE ARE ALWAYS HERE TO HELP YOU',
    link: '/categories',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/slide_2_2048x755_crop_top.png?v=1547809193',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Banner 1',
    caption: 'Any Box for Bottles Can Transform Into a Gift Box',
    sub_caption: 'YOUR GIFT WILL BE HARD TO MISS',
    link: '/categories',
    image_url: 'https://cdn.shopify.com/s/files/1/0203/6554/1476/files/slide_3_2048x755_crop_top.png?v=1547809195',
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
   await queryInterface.bulkInsert('Banners',banners)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners',null)
  }
};
