const { Product, Cart } = require('../models/index')

class CartController {
  static addToCart(req, res, next) {
    const obj = {
      UserId: req.userLogin.id,
      ProductId: req.body.ProductId,
      quantity: req.body.quantity
    }
    Cart.create(obj)
    .then(data => {
      console.log(data)
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showCart(req, res, next) {
    console.log(req.userLogin)
    Cart.findAll({
      where: {
        UserId: req.userLogin.id
      },
      include: Product
    })
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static changeQuantity(req, res, next) {
    const id = req.params.id
    Cart.update({ quantity: req.body.quantity }, {
      where: {
        id: id
      }
    })
    .then(() => {
      console.log('Cart quantity successfully updated!')
      res.status(200).json({msg: 'Cart quantity successfully updated!'})
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
      console.log('Item has been removed from cart!')
      res.status(200).json({msg: 'Item has been removed from cart!'})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController