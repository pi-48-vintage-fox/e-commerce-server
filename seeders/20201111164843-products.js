'use strict';

const products = [
  {
    name: "Auctor gravida enim",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-07.jpg",
    imageId: "",
    ProductCategoryId: 4
  },
  {
    name: "Morbi tristique",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-12.jpg",
    imageId: "",
    ProductCategoryId: 4
  },
  {
    name: "Tincidunt malesuada",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-14.jpg",
    imageId: "",
    ProductCategoryId: 4
  },
  {
    name: "Aliquam sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-17.jpg",
    imageId: "",
    ProductCategoryId: 3
  },
  {
    name: "Condimentum furniture",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-12.jpg",
    imageId: "",
    ProductCategoryId: 3
  },
  {
    name: "Condimentum posuere",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/11/product_25.jpg",
    imageId: "",
    ProductCategoryId: 3
  },
  {
    name: "Auctor gravida enim",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-14.jpg",
    imageId: "",
    ProductCategoryId: 5
  },
  {
    name: "Morbi tristique",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-15.jpg",
    imageId: "",
    ProductCategoryId: 5
  },
  {
    name: "Tincidunt malesuada",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-21.jpg",
    imageId: "",
    ProductCategoryId: 5
  },
  {
    name: "Morbi tristique",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-19.jpg",
    imageId: "",
    ProductCategoryId: 1
  },
  {
    name: "Tincidunt malesuada",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-20.jpg",
    imageId: "",
    ProductCategoryId: 1
  },
  {
    name: "Morbi tristique",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-17.jpg",
    imageId: "",
    ProductCategoryId: 2
  },
  {
    name: "Tincidunt malesuada",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus",
    price: 150000,
    stock: 100,
    imageUrl: "https://lustria.g5plus.net/wp-content/uploads/2018/12/product-18.jpg",
    imageId: "",
    ProductCategoryId: 2
  },
]

products.forEach(product => {
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
  }
};
