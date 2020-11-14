'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Banners', [
    {
      title: 'Sale Decor 30% off',
      image_url: 'https://cdn.artboard.co/private/Google_113596245918522199101/projects/5c543cf603044f001ff77890/preview.png?ver=1549025609109',
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Free shipping',
      image_url: 'https://blog.3dcart.com/hs-fs/hubfs/image4-2.png?width=1413&height=299&name=image4-2.png',
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Summer Sale',
      image_url: 'https://us.123rf.com/450wm/varijanta/varijanta1806/varijanta180600102/103283344-stock-vector-summer-sale-banner-design-template-vector-illustration-concept-for-internet-marketing-poster-shoppin.jpg?ver=6',
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Summer Sale',
      image_url: 'https://us.123rf.com/450wm/varijanta/varijanta1806/varijanta180600102/103283344-stock-vector-summer-sale-banner-design-template-vector-illustration-concept-for-internet-marketing-poster-shoppin.jpg?ver=6',
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
