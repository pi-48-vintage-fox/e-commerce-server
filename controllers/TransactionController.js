'use strict'
const {Transaction,TransactionDetail,Cart,User,Product, sequelize} = require('../models')
class TransactionController {
  static async getHistory(req, res, next) {
    try {
      let history = await Transaction.findAll({
        where: {
          UserId : req.loggedInUser.id
        },
        include:{
          model: TransactionDetail
        }
      })
      res.status(200).json({
        msg: 'Transaction Fetched',
        transactions : history
      })
    } catch (error) {
      next(error)
    }
  }
  static async checkOut(req, res, next) {
    try {
      let cartItems = req.body.cartItems
      cartItems.forEach(async(item)=>{
        try {
          let product = await Product.findOne({
            where:{
              id: item.ProductId
            }
          })
          if(product.stock - item.qty < 0) throw {msg:'Checkout failed', status: 400}
          product.stock = product.stock - item.qty
          let cart = await Cart.findOne({
            where:{
              UserId: req.loggedInUser.id,
              ProductId: item.ProductId,
              status: 'unpaid'
            }
          })
          cart.status = 'paid'
          product.save()
          cart.save()
        } catch (error) {
          next(error)
        }        
      })
      res.status(200).json({
        msg:'checkout success'
      })
    } catch (error) {
      next(error)
    }
  }
  static async getCartItems(req, res, next) {
    try {
      let cartItems = await Cart.findAll({
        where:{
          UserId: req.loggedInUser.id,
          status: 'unpaid'
        },
        include:{
          model: Product
        }
      })

      res.status(200).json({
        msg: 'Cart Fetched',
        cartItems
      })
    } catch (error) {
      next(error)
    }
  }
  static async newCartItem(req, res, next) {
    try {
      let data = {
        UserId: req.loggedInUser.id,
        ProductId: req.body.id,
        status: 'unpaid'
      }
      let cart = await Cart.findOne({
        where:{
          UserId: data.UserId,
          ProductId: data.ProductId,
          status: data.status
        }
      })
      let product = await Product.findOne({
        where: {
          id : data.ProductId
        }
      })
      if(!cart) {
        data.qty = 1
        await Cart.create(data)
      }else{        
        cart.qty += 1
        if(product.stock - cart.qty < 0) throw { msg: 'Tidak bisa membeli lebih dari stok', status: 400}
        cart.save()
      }

      res.status(200).json({
        msg: "Item added to cart"        
      })

    } catch (error) {
      next(error)
    }
  }
  static async updateCartItem(req, res, next) {
    try {
      let data = {
        ProductId: req.body.ProductId,
        qty: req.body.qty
      }
      console.log(data);
      let cart = await Cart.findOne({
        where:{
          UserId: req.loggedInUser.id,
          ProductId : data.ProductId,
          status:'unpaid'    
        }
      })
      let product = await Product.findOne({
        where:{
          id: data.ProductId
        }
      })

      

      if(product.stock - data.qty < 0) throw { msg: 'Tidak bisa melebihi dari stok', status: 400 } 

      cart.qty = data.qty
      cart.save()
      res.status(200).json({
        msg: 'Cart Updated'
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteCartItem(req, res, next) {
    try {
      let data = {
        ProductId: req.body.ProductId
      }
      console.log(req.body);
      let cart = await Cart.findOne({
        where: {
          UserId: req.loggedInUser.id,
          ProductId: data.ProductId,
          status:'unpaid'
        }
      })
      cart.destroy()
      cart.save()
      res.status(200).json({
        msg: 'Item removed from cart'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController