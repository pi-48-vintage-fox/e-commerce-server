'use strict';

const banners = [
  {
    title: "advan g9pro",
    status: 'active',
    imageUrl: "https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/11/13/5efbf040-2b7c-4f90-91d2-5e0e7cb9dfb1.jpg.webp",
    imageId: "",
  },
  {
    title: "tokomember daftar",
    status: 'active',
    imageUrl: "https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/10/6/c6564441-232f-44cd-a9af-1d1a999edad0.jpg.webp",
    imageId: "",
  },
  {
    title: "promo sabtu minggu",
    status: 'inactive',
    imageUrl: "https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/11/13/88a5825d-3631-4476-806b-42000abfdf52.jpg.webp",
    imageId: "",
  },
  {
    title: "perkakas jitu",
    status: 'inactive',
    imageUrl: "https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/11/12/f852ae7d-1c10-4c85-ad26-cb9353fff9fe.jpg.webp",
    imageId: "",
  },
  {
    title: "cashback 80 persen",
    status: 'active',
    imageUrl: "https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/9/24/a5a5c297-f765-4925-bda3-97240efdf844.jpg.webp",
    imageId: "",
  },
  

]

banners.forEach(banner => {
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
  }
};
