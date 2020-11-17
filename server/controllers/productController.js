const { Product } = require('../models')

class ProductController {

  static postProduct(req, res, next) {
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    Product.create(payload)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getProduct(req, res, next) {
    Product.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static putProduct(req, res, next) {
    const id = +req.params.id
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    Product.update(payload, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    const id = +req.params.id
    Product.destroy({
      where: {
        id
      }
    })
      .then(data => {
        if (!data) {
          res.status(400).json({
            message: 'Data not found'
          })
        } else {
          res.status(200).json({
            message: 'Delete completed'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = ProductController