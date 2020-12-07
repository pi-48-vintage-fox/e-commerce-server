const { Cart, Product } = require('../models')

class CartController {

  static postCart(req, res, next) {
    Card.findOne({
      where: {
        UserId: req.decoded.id,
        ProductId: +req.params.id,
        status: 'unpaid'
      }
    })
      .then(cart => {
        if (cart) {
          return cart.update({
            quantity: cart.quantity + 1
          })
        }
      })
      .then(data => {
        Cart.create({
          UserId: req.decoded.id,
          ProductId: +req.params.id,
          quantity: 1,
          status: 'unpaid'
        })
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getCart(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.decoded.id
      },
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static putCart(req, res, next) {
    const id = +req.params.id
    const payload = {
      quantity: +req.body.quantity
    }
    Cart.update(payload, {
      where: {
        UserId: req.decoded.id,
        ProductId: id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'update sueccess'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    Cart.destroy({
      where: {
        ProductId: req.params.id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'delete success'
        })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = CartController