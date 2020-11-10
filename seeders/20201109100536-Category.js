"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
        {
          name: "Agama & Filsafat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Buku Anak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ensiklopedia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fiksi & Literatur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hobby & Teknologi Tepat Guna",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kesehatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Komik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lifestyle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Motivasi & Bisnis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Novel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pelajaran",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Perguruan Tinggi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sosial, Politik, Budaya, Sejarah, Biografi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tes & Psikotes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};