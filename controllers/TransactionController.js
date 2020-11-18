'use strict'
const {Transaction,TransactionDetail,Cart,User,Product} = require('../models')
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

    } catch (error) {
      next(error)
    }
  }
  static async getCartItems(req, res, next) {
    try {
      let cartItems = await Cart.findAll({
        where:{
          UserId: req.loggedInUser.id
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
        ProductId: req.body.ProductId,
        qty: req.body.qty
      }

      let cart = await Cart.findOne({
        where:{
          UserId: data.UserId,
          ProductId: data.ProductId
        }
      })

      if(!cart) {
        await Cart.create(data)
      }else{
        cart.qty = data.qty
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
      let cart = await Cart.findOne({
        where:{
          UserId: req.loggedInUser.id,
          ProductId : data.ProductId        
        }
      })
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
      let cart = await Cart.findOne({
        where: {
          UserId: req.loggedInUser.id,
          ProductId: data.ProductId
        }
      })
      cart.delete()
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