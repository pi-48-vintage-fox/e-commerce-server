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
      console.log(req.params.id, '<<<<<<<<< ini req.params.id')
      let params = {
        UserId: req.loginUser.id,
        ProductId: req.params.id,
        quantity: req.body.quantity,
        status: false
      }
      const data = await Cart.create(params, {include: Product})
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  // ini buat nambah/kurangin quantity didalam halaman cart nya,
  // nanti di halaman cart nya dibikin 2 tombol, kalo + berarti quantity +1.
  // kalo - berarti quantity -1
  static async updateCart(req, res, next) {
    try {
      let params = {
        quantity: req.body.quantity
      }
      const data = await Cart.update(params, {
        where: {
          id: req.params.id,
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  //tombol delete ini masuk didalam card nya cart
  static async deleteCart(req, res, next) {
    try {
      const data = await Cart.destroy({
        where : {
          id: req.params.id
        }
      })
      res.status(200).json({msg: 'berhasil dihapus!'})
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
      for(const key of dataCart) {
        let sisaStock = {stock: key.Product.stock - key.quantity}
        await Product.update(sisaStock, {
          where : {
            id: key.Product.id
          }
        })
        let params = {status: true}
        await Cart.update(params, {
          where: {
            id: key.id
          }
        })
        res.status(200).json({msg: 'checkout berhasil'})
      }
    } catch (error) {
      console.log(error)
      next(error)
    }

  }

}


module.exports = CartController