const {Product, Cart, User} = require('../models/')

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

  static async getAll(req,res,next){
    try {
      let product=await Product.findAll({order:[['price','DESC']]})
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async getById(req,res,next){
    try {
      let id = req.params.id
      let product=await Product.findAll({where:{id}})
      res.status(200).json(product)
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

  static async addToCart(req,res,next){
    try {
      let {id} = req.params
      let params = {
        ProductId: +id,
        UserId: +req.userData.id,
        quantity: +req.body.quantity,
        price: +req.body.price,
        status:'booked'
      }
      let updateProductDB = await Product.findByPk(id)

      if(updateProductDB.stock >= params.quantity){
        let stockUpdate = updateProductDB.stock - params.quantity
        
        //mencari apakah produk ini ada di dalam cart user yang dimaksud
        let showCart = await User.findOne({where:{id:req.userData.id}, include: Product})
        let userCart = showCart.Products
        for (let i = 0 ; i <= userCart.length; i ++){
          if(userCart[i].Cart.ProductId === +req.params.id){
            let updateQuantity = userCart[i].Cart.quantity + params.quantity
            let updateTotalPrice = updateQuantity * userCart[i].Cart.price

            let updateParams = {
              quantity: updateQuantity,
              totalPrice: updateTotalPrice
            }

            let updateCart = await Cart.update(updateParams, {where:{ProductId:params.ProductId}})
            let dbUpdate = await Product.update({stock: stockUpdate}, {where:{id}})
            res.status(200).json({updateCart})
            
          }else{
            let cart = await Cart.create(params)
            let dbUpdate = await Product.update({stock: stockUpdate}, {where:{id}})
            res.status(201).json({cart})
          }
        }

      }else{
        next ({name:'Product is unavailable at the moment'})
      }  
    } catch (error) {
      next (error)
    }
  }

  static async showCart (req,res,next){
    try {
      let id = +req.userData.id
      let showCart = await User.findOne({where:{id}, include: Product})
      res.status(200).json({showCart:showCart.Products})
    } catch (error) {
      next(error)
    }
  }
}