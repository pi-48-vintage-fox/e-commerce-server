const {
  Product
} = require('../models')

class ProductController {

  static createProduct(req, res, next) {
    const productData = {
      name: req.body.name,
      price: +req.body.price,
      stock: +req.body.stock,
      image_url: req.body.image_url
    }

    Product.create(productData)
      .then(({
        id,
        name
      }) => {
        res.status(201).json({
          id,
          name
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static showProduct(req, res, next) {
    Product.findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    Product.update(req.body, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {

    Product.destroy({
        where: {
          id: +req.params.id
        }
      })
      .then(data => {
        res.status(200).json({
          message: 'Deleted Successfully'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController