const { Product, User, Cart } = require('../models/index')

class ProductController {
  static async show(req,res,next){
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async add(req,res,next){
    console.log('MUNCULLLLLLLLL');
    try {
      let input = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock,
        category: req.body.category
      }
      const data = await Product.create(input)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      let input = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock,
        category: req.body.category
      }
      const data = await Product.update(input, {
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg: 'Product has been updated'})
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const data = await Product.destroy({
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg : "Product has been deleted successfully"})
    } catch (err) {
      next(err)
    }
  }

  static async addToCart(req, res, next){
    try {
      const userId = req.loggedInUser.id
      const productId = req.body.productId
      const cart = await Cart.findOne({
        where: {
          userId,
          productId
        }
      })
      const barang = await Product.findOne({
        where: {
          id: productId
        }
      })
      console.log(barang.price);
      if(!cart){
        const data = await Cart.create({
          userId,
          productId,
          quantity: 1,
          totalPrice: barang.price*1
        })
        res.status(201).json(data)
      }else if(cart){
        console.log(cart);
        const temp = cart.quantity+1
        const input = {
          quantity: temp,
          totalPrice: temp*barang.price
        }
        console.log(input);
        const product = await Product.findOne({
          where: {
            id: productId
          }
        })
        const currentCart = await Cart.findOne({
          where: {
            userId,
            productId
          }
        })
        if(currentCart.quantity>=product.stock){
          throw { msg: "Cannot add more than stock", status: 401 }
        }else{
          const data = await Cart.update(input,{
            where:{
              userId,
              productId
            },
            returning: true
          })
          res.status(201).json(data)
        }
        
      }
    } catch (err) {
      next(err)
    }
  }
  static async showCart(req, res, next){
    try {
      const data = await Cart.findAll({
          where: {
            userId: req.loggedInUser.id
          },
          include: User,
          include: Product
      })
      let result = []
      data.forEach(el => {
        result.push({
          id: el.Product.id, 
          image_url: el.Product.image_url, 
          name: el.Product.name, 
          category: el.Product.category, 
          quantity: el.quantity,
          totalPrice: el.totalPrice
        })
      });
      console.log(result);
      res.status(200).json(result)
    }catch (err) {
      next(err)
    }
  }
  static async deleteCart(req, res, next){
    try {
      const userId = req.loggedInUser.id
      const productId = req.params.id
      await Cart.destroy({
        where: {
          userId,
          productId
        }
      })
      res.status(200).json('Successfully remove item from cart')
    } catch (error) {
      next(err)
    }
  }
  static async updateCart(req, res, next){
    try {
      const userId = req.loggedInUser.id
      const productId = req.params.id
      const product = await Product.findOne({
        where: {
          id: productId
        }
      })
      const input = {
        quantity: req.body.quantity,
        totalPrice: req.body.quantity*product.price
      }
      if(req.body.quantity > product.stock){
        throw { name: 'Cannot Do That', msg: "Cannot add more than stock", status: 401 }
      }else if (req.body.quantity<=0){
        throw { name: 'Cannot Do That', msg: "Item Quantity cannot below zero", status: 401 }
      }
      else{
        const data = await Cart.update(input,{
          where:{
            userId,
            productId
          },
          returning: true
        })
        res.status(201).json(data)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController