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

  static async addToCart (req,res,next){
    try {
      let ProductId = req.params.id
    
      let cekProduct = await Product.findOne({where:{id:ProductId}})
      if(cekProduct.stock > 0){
        let cekCart = await Cart.findOne({where:{UserId:req.userData.id, ProductId}})

        if (cekCart && (cekProduct.stock >= cekCart.quantity+1) ){
          
          let params = {
            quantity:cekCart.quantity+1
          }
          let updateCart = await Cart.update(params,{where:{ProductId,UserId:req.userData.id}})
          res.status(200).json({updateCart})

        }else if (!cekCart){
          let params = {
            ProductId: +ProductId,
            UserId: +req.userData.id,
            quantity: 1,
            price: cekProduct.price,
            status:'booked'
          }
          let createCart = await Cart.create(params)
          res.status(201).json({createCart})
        }else {
          next({name:'Product is unavailable at the moment'})
        }
      }else {
        next({name:'Product is unavailable at the moment'})
      }
    } catch (error) {
      console.log(error)
      next(error)
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

  static async cartUpdate (req, res, next) {
    try {
      let ProductId = req.params.id

      let params = {
        quantity: +req.body.quantity
      }

      let cartFind = await Cart.findOne({where:{ProductId}})
      if (cartFind.UserId === req.userData.id){
        let searchProductDB = await Product.findOne({where:{id:ProductId}})
        if(searchProductDB.stock - params.quantity < 0){
          next ({name:'Product is unavailable at the moment'})
        }else{
          // let updateProductDB = searchProductDB.stock - params.quantity
      
          let updateProductCart = params.quantity
          let updateTotalPriceCart = updateProductCart * cartFind.price
          console.log(params.quantity,'a')
          let cartUpdateParams = {
            quantity: +updateProductCart,
            totalPrice: +updateTotalPriceCart
          }
          console.log(cartUpdateParams,'server')

          // let dbProductUpdate = {
          //   stock: updateProductDB
          // }
          let recentCart= await Cart.update(cartUpdateParams,{where:{ProductId, UserId:req.userData.id}})
          // let updateDBProduct = await Product.update(dbProductUpdate,{where:{id:ProductId}})
          res.status(200).json(recentCart)
        }
      }else{
        res.status(200).json([])
      }
    } catch (error) {
      console.log(error)
      next (error)
    }
  }

  static async deleteCart (req,res,next){
    try {
      let ProductId = req.params.id
      console.log(ProductId, req.userData.id)
      let deleteCart = await Cart.destroy({where:{UserId: req. userData.id, ProductId}})
      res.status(200).json({msg:'succesfully delete the product'})
    } catch (error) {
      next (error)
    }
  }
}