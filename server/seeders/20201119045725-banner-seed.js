'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   let dataBanner = [
     {
       title: 'COD cashback 80%',
       status: 'active',
       image_url: 'https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/9/24/d7b88fce-dd8a-4b15-b750-7661834d9604.jpg?b=KHCSLZEY0%24FPne-54%7Dot-l.webp'
     },
     {
      title: 'Bebas Ongkir',
      status: 'active',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/11/17/b56f9edc-5aa0-47e9-9f10-4eb0f715a5a0.jpg.webp'
    },
    {
      title: 'Discount PocariSweet',
      status: 'active',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/1208/NsjrJu/2020/10/23/6e902307-0f3f-447f-895b-3e4714815b51.jpg.webp'
    }
   ]
   return queryInterface.bulkInsert("Banners", dataBanner, {})
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete("Banners", null, {})
  }
};
