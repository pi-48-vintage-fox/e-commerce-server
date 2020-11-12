const { Product } = require('../models/index')

class productController {

  // Create new product
  static createProduct(req, res, next) {
    let obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create(obj)
    .then(data => {
      // console.log(data);
      res.status(201).json({
        id: data.id,
        name: data.name,
        image_url: data.image_url,
        price: data.price,
        stock: data.stock
      })
    })
    .catch(err => {
      // console.log(err);
      next(err)
    })
  }

  // Menampilkan semua list product
  static showProduct(req, res, next) {
    Product.findAll({
      order: [['id', 'ASC']]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  // Menampilkan produk berdasarkan id
  static showProductById(req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }


  // Mengupdate data product
  static editProduct(req, res, next) {
    let id = req.params.id
    let obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.update(obj, {
      where: {
        id: +id
      },
      returning: true
    })
    .then(response => {
      console.log(response[1][0].name);
      res.status(200).json({
        name: response[1][0].name,
        image_url: response[1][0].image_url,
        price: response[1][0].price,
        stock: response[1][0].stock
      })
    })
    .catch(err => {
      next(err)
    })
  }

  // Menghapus product
  static deleteProduct(req, res, next) {
    let id = req.params.id
    Product.destroy({
      where: {
        id: +id
      }
    })
    .then(() => {
      res.status(200).json({ message: "Success delete product"})
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = productController