const { User, Product, Cart } = require('../models/index')

class CartController {
  static addToCart(req, res, next) {
    const obj = {
      UserId: req.body.userId,
      ProductId: req.params.id,
      quantity: req.body.quantity,
      status: 'Waiting for payment'
    }
    Cart.create(obj)
    .then(({data}) => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showCart(req, res, next) {
    Cart.findAll({ include: User, Product })
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static changeStatus(req, res, next) {
    const id = req.params.id
    Cart.update({ status: req.body.status }, {
      where: {
        id: id
      }
    })
    .then(() => {
      console.log('Cart status successfully updated!')
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCart(req, res, next) {
    const id = req.params.id
    Cart.delete({
      where: {
        id: id
      }
    })
    .then(() => {
      console.log('Order has been completed!')
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController