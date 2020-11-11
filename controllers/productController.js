const {Product} = require('../models/')

module.exports = class productController {
  static async createProduct (req,res,next){
    try {
      let params = {
        name:req.body.name,
        image_url:req.body.image_url,
        price: +req.body.price,
        stock:+req.body.stock,
        UserId:+req.userData.id
      }

      let newProduct = await Product.create(params)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }

  static async editProduct(req,res,next){
    try {
      let {id} = req.params
      let params = {
        name:req.body.name,
        image_url:req.body.image_url,
        price: +req.body.price,
        stock:+req.body.stock
      }

      let updateData = await Product.update(params, {where:{id}, returning:true})
      if (updateData[0] == 0){
          next({name:'Error, Data Not Found'})
      }else if(!params){
          next({name:'Please Fill Product Detail To Update'})
      }else{
          res.status(200).json(updateData[1][0])
      }
    } catch (error) {
      next (error)
    }
  }

  static async deleteProduct(req,res,next){
    try {
      let {id}= req.params
      let deleteItem = await Product.destroy({where:{id}})
      if(!deleteItem){
        next({name:'Product Not Found'})
      }else{
        res.status(200).json(`Product sucessfully deleted `)
      }
    } catch (error) {
      next(error)
    }
  }
}