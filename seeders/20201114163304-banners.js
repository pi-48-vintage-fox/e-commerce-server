'use strict'

const banners = [
  {
    title: 'diskon1',
    status: 'active',
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1605786386/e-commerce%20gardenbyte/plant_banner1_by2agj.jpg',
    imageId: '',
  },
  {
    title: 'diskon2',
    status: 'active',
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1605786384/e-commerce%20gardenbyte/plant_banner2_odvtwz.jpg',
    imageId: '',
  },
]

banners.forEach((banner) => {
  banner.createdAt = new Date()
  banner.updatedAt = new Date()
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

    await queryInterface.bulkInsert('Banners', banners, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Banners', null, {})
  },
}
