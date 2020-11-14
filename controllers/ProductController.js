'use strict'

const { Product } = require('../models')

class ProductController {

  static async index(req, res, next) {
    try {
      let products = await Product.findAll()
      res.status(200).json({
        msg: "Products Fetched",
        products
      })
    } catch (err) {
      next(err)
    }
  }
  static async create(req, res, next) {
    try {
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        descriptions: req.body.descriptions
      }

      let product = await Product.create(data)

      res.status(200).json({
        msg: "Product added",
        product
      })

    } catch (err) {
      next(err)
    }
  }
  static async update(req, res, next) {
    try {
      let id = req.params.id
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        descriptions: req.body.descriptions
      }

      let product = await Product.update(data,{where:{id},returning:true})

      res.status(200).json({
        msg: "Product updated",
        product:product[1][0]
      })
      
    } catch (err) {
      next(err)
    }
  }
  static async delete(req, res, next) {
    try {
      let id = req.params.id
      let product = await Product.findByPk(id)
      res.status(200).json({
        msg: "Product deleted",
        product
      })
      product.destroy()
      product.save()
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ProductController