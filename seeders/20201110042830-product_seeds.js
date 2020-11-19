'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Products', [
    {
      name: 'Philodendron Monstera Deliciousa',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/5/1/15561420/15561420_f74c6c64-a570-4577-80e9-e503dad3eaec_700_700.jpg',
      price: 115000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Chrysalidocarpus lutescens',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/7/2/39407162/39407162_ee79579c-3143-4391-bc34-1557e52b68c3_600_600',
      price: 200000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Caladium White',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/9/30/fac08e5c-2581-4f84-87de-3c5dc065c97f.jpg',
      price: 85000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Tawon Putih',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/12/18/2796467/2796467_52b726b8-2c42-45aa-8161-aa4f2fb76258_700_700.jpg',
      price: 54000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Peace Lily Green',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/2/945151365/945151365_378751ba-668d-441d-b539-33480a25cdb4_720_720.jpg',
      price: 100000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Philodendron Black',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/4/30/39740587/39740587_f289cc2f-164f-4645-b859-2aa686423df1_700_700.jpg',
      price: 1880000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Maranta Ekor Ayam',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/7/13/5100253/5100253_715e8d6e-c5fc-4627-8c27-ce7e2bbb351c',
      price: 35000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Mona Lavender',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2018/1/30/0/0_e38744d7-b3c5-493b-93e8-ba6fa3307086_600_600.jpg',
      price: 25000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Meranti Tissue',
      image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/2/1/39396366/39396366_fcd2bd37-6ea2-4a21-a5c0-c26136b215df_300_300',
      price: 35000,
      stock: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    }], 
    {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
