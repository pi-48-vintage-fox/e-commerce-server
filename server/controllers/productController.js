const { Product } = require('../models/index')

class productController {
  static createProduct(req, res, next) {
    let obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create(obj)
    .then(data => {
      console.log(data);
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
}

module.exports = productController