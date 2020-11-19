'use strict'

const products = [
  {
    name: 'Auctor gravida enim',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 150000,
    stock: 6,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-07.jpg',
    imageId: '',
    ProductCategoryId: 4,
  },
  {
    name: 'Morbi tristique',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 25000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-12.jpg',
    imageId: '',
    ProductCategoryId: 4,
  },
  {
    name: 'Tincidunt malesuada',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 175000,
    stock: 9,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-14.jpg',
    imageId: '',
    ProductCategoryId: 4,
  },
  {
    name: 'Aliquam sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 525000,
    stock: 7,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-17.jpg',
    imageId: '',
    ProductCategoryId: 3,
  },
  {
    name: 'Condimentum furniture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 375000,
    stock: 10,
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1605787738/e-commerce%20gardenbyte/product-20_gzzjkl.jpg',
    imageId: '',
    ProductCategoryId: 3,
  },
  {
    name: 'Condimentum posuere',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 245000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/11/product_25.jpg',
    imageId: '',
    ProductCategoryId: 3,
  },
  {
    name: 'Auctor gravida enim',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 150000,
    stock: 10,
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1605787738/e-commerce%20gardenbyte/product-12_gtbvnm.jpg',
    imageId: '',
    ProductCategoryId: 5,
  },
  {
    name: 'Morbi tristique',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 425000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-15.jpg',
    imageId: '',
    ProductCategoryId: 5,
  },
  {
    name: 'Tincidunt malesuada',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 175000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-21.jpg',
    imageId: '',
    ProductCategoryId: 5,
  },
  {
    name: 'Morbi tristique',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 555000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-19.jpg',
    imageId: '',
    ProductCategoryId: 1,
  },
  {
    name: 'Tincidunt malesuada',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 600000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-20.jpg',
    imageId: '',
    ProductCategoryId: 1,
  },
  {
    name: 'Morbi tristique',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 275000,
    stock: 10,
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1605787739/e-commerce%20gardenbyte/product-07_sp5gqs.jpg',
    imageId: '',
    ProductCategoryId: 2,
  },
  {
    name: 'Tincidunt malesuada',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus',
    price: 375000,
    stock: 10,
    imageUrl:
      'https://lustria.g5plus.net/wp-content/uploads/2018/12/product-18.jpg',
    imageId: '',
    ProductCategoryId: 2,
  },
]

products.forEach((product) => {
  product.createdAt = new Date()
  product.updatedAt = new Date()
})

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

    await queryInterface.bulkInsert('Products', products, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Products', null, {})
  },
}
