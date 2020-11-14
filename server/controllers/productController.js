const { Product } = require('../models/index')

class ProductController {
  static add(req, res, next) {
    const obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    Product.create(obj)
      .then(data => {
        res.status(201).json({
          id: data.id,
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static fetch(req, res, next) {
    Product.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static fetchById(req, res, next) {
    const id = +req.params.id
    Product.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static edit(req, res, next) {
    const id = +req.params.id
    const obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(obj, {
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).json({msg: "Successfully edited data with id: " + id})
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next) {
    const id = req.params.id

    Product.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).json({msg: "Successfully deleted product!"})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ProductController