'use strict'

const banners = [
  {
    title: 'diskon1',
    status: 'active',
    imageUrl: 'http://plant.engotheme.com/wp-content/uploads/2018/09/11.jpg',
    imageId: '',
  },
  {
    title: 'diskon2',
    status: 'active',
    imageUrl: 'http://plant.engotheme.com/wp-content/uploads/2018/09/10.jpg',
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
