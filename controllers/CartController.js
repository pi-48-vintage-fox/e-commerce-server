'use strict'

const { Cart, Product } = require('../models/index')

class CartController {
  static async showCart(req, res, next) {
    try {
      const data = await Cart.findAll({
        include: Product,
        where: {
          UserId: req.loginUser.id,
          status: false
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async addCart(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const ProductId = +req.params.id
      const quantity = +req.body.quantity
      console.log({UserId, ProductId, quantity}, '<<<<<<<<<<<bismillah');
      const cart = await Cart.findOne({ where: {
        UserId,
        ProductId,
        status: false
      }
      
      })
      if (cart) {
        console.log(cart.toJSON(),'<<<<<<<<<<< cart sudah ada');
        let newQuantity = cart.quantity + quantity
        try {
          await cart.update({quantity:newQuantity})
          res.status(200).json(cart)
        } catch (error) {
          console.log(error, '<><><><><><><> error updating cart');
        }
      }
      else { 
        try {
          const newCart = await Cart.create({
            UserId,
            ProductId,
            quantity: 1,
            status: false
          })
          console.log(newCart.toJSON());
          res.status(201).json(newCart)
        } catch (error) {
          console.log(error, '<><><><><><><><><> error creating cart');
        }

      }
    } catch (error) {
      next(error)
    }
  }

  // ini buat nambah/kurangin quantity didalam halaman cart nya,
  // nanti di halaman cart nya dibikin 2 tombol, kalo + berarti quantity +1.
  static async updateTambahCart(req, res, next) {
    try {
      let dataCart = await Cart.findByPk(req.params.id)
      let dataProduct = await Product.findByPk(dataCart.ProductId)
      if(dataCart.quantity >= dataProduct.stock){
        throw error
      }
      else{
        let params = {
          quantity: req.body.quantity
        }
        const data = await Cart.update(params, {
          where: {
            id: req.params.id,
          }
        })
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  // ini buat nambah/kurangin quantity didalam halaman cart nya,
  // nanti di halaman cart nya dibikin 2 tombol, kalo - berarti quantity -1.
  static async updateKurangCart(req, res, next) {
    try {
      let dataCart = await Cart.findByPk(req.params.id)
      if(dataCart.quantity <= 0){
        throw error
      }
      else{
        let params = {
          quantity: req.body.quantity
        }
        const data = await Cart.update(params, {
          where: {
            id: req.params.id,
          }
        })
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  //tombol delete ini masuk didalam card nya cart
  static async deleteCart(req, res, next) {
    try {
      const data = await Cart.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({ msg: 'berhasil dihapus!' })
    } catch (error) {
      next(error)
    }

  }

  static async checkOut(req, res, next) {
    try {
      const dataCart = await Cart.findAll({
        include: Product,
        where: {
          UserId: req.loginUser.id,
        }
      })
      for (const key of dataCart) {
        let sisaStock = { stock: key.Product.stock - key.quantity }
        await Product.update(sisaStock, {
          where: {
            id: key.Product.id
          }
        })
        let params = { status: true }
        await Cart.update(params, {
          where: {
            id: key.id
          }
        })
        res.status(200).json({ msg: 'checkout berhasil' })
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}


module.exports = CartController