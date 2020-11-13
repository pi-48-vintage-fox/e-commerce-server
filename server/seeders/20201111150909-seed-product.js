'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
        name: "I-Phone Putin Version",
        price: 55000000,
        stock: 5,
        image_url: 'https://caviar.global/images/detailed/5/caviar_Putin_gold_3_catalog.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Headset JBL Original",
        price: 2500000,
        stock: 10,
        image_url: "https://images-na.ssl-images-amazon.com/images/I/61ptzNC8r8L._SL1500_.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};