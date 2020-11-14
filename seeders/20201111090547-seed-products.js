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
   const data = [
     {
       name: 'Jacket H&M',
       image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/26/7990097/7990097_156a7345-78ec-4006-aeb7-6e475343ce0f_600_900.jpg',
       S: 10,
       M: 11,
       L: 13,
       XL: 14,
       price: 350000,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Jacket NASA Pull & Bear',
       image_url: 'https://cf.shopee.co.id/file/d50f4b5162af0cb1940c90ae64abcb4a',
       S: 20,
       M: 21,
       L: 33,
       XL: 44,
       price: 450000,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Jacket Zara',
      image_url: 'https://static.zara.net/photos///2020/I/0/2/p/8281/300/401/2/w/560/8281300401_6_1_1.jpg?ts=1598884682075',
      S: 20,
      M: 11,
      L: 22,
      XL: 24,
      price: 550000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Champion Black',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jacket Dummy',
      image_url: 'https://cf.shopee.ph/file/6b7fb57cdabc81122e84f7b06c36b827',
      S: 20,
      M: 21,
      L: 13,
      XL: 34,
      price: 650000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]
   queryInterface.bulkInsert("Products", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("Products", null)

  }
};
