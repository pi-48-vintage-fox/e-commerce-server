'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
   let data = [
     { name: "Makanan & Minuman" },
     { name: "Perawatan & Kecantikan" },
     { name: "Handphone & Accessories" },
     { name: "Ibu & Bayi" },
     { name: "Fashion Muslim" },
     { name: "Perlengkapan Rumah" },
     { name: "Pakaian Pria" },
     { name: "Pakaian Wanita" },
     { name: "Kesehatan" },
     { name: "Komputer & Aksesoris" },
     { name: "Fashion Bayi & Anak" },
     { name: "Sepatu Pria" },
     { name: "Sepatu Wanita" },
     { name: "Tas Pria" },
     { name: "Tas Wanita" },
     { name: "Jam Tangan" },
     { name: "Elektronik" },
     { name: "Aksesoris Fashion" },
     { name: "Hobi & Koleksi" },
     { name: "Fotografi" },
     { name: "Olahraga & Outdoor" },
     { name: "Otomotif" },
     { name: "Buku & Alat Tulis" },
     { name: "Voucher" },
     { name: "Serba Serbi" },
     { name: "Souvenir & Pesta" },
     { name: "Lain-Lain" },
   ]
   data.forEach(el => {
     el.createdAt =  new Date(),
     el.updatedAt = new Date()
   })
   return queryInterface.bulkInsert("Categories", data, {})
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
