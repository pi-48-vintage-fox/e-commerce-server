const { Product } = require('../models/index')

class ProductController {
  static async show(req,res,next){
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async add(req,res,next){
    try {
      let params = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock
      }
      const data = await Product.create(params)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req,res,next){
    try {
      let params = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock
      }
      const data = await Product.update(params)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req,res,next){
    try {
      const data = await Product.destroy({
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg : "product has been deleted"})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = ProductController