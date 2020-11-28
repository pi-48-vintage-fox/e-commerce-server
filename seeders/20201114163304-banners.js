'use strict'

const banners = [
  {
    title: 'member-discount',
    status: 'active',
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1606588483/e-commerce%20gardenbyte/banners/slider1-member-discount.jpg',
    imageId: '',
  },
  {
    title: 'terrarium-week',
    status: 'active',
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1606588594/e-commerce%20gardenbyte/banners/slider2-terrarium-week.jpg',
    imageId: '',
  },
  {
    title: 'new-collections',
    status: 'active',
    imageUrl:
      'https://res.cloudinary.com/rey-h8/image/upload/v1606588483/e-commerce%20gardenbyte/banners/slider3-new-collections.jpg',
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
