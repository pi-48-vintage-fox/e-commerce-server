const {
  Cart,
  Product
} = require('../models')

class CartController {

  static createCart(req, res, next) {
    Product.findOne({
        where: {
          id: req.params.ProductId
        }
      })
      .then((product) => {
        if (!product) {
          throw {
            name: "BadRequest",
            message: "Product doesn't exist"
          }
        } else if (product.stock < req.body.quantity) {
          throw {
            name: "BadRequest",
            message: "Stock doesn't enough"
          }
        } else {
          return Cart.findOne({
              where: {
                UserId: req.userData.id,
                ProductId: req.params.ProductId,
                status: "New"
              }
            })
            .then((cart) => {
              if (cart) {
                let quantity = cart.quantity + 1
                return cart.update({
                  quantity
                })
              } else {
                let newCart = {
                  UserId: req.userData.id,
                  ProductId: req.params.ProductId,
                  quantity: req.body.quantity
                }
                return Cart.create(newCart)
              }
            })
            .then((result) => {
              res.status(201).json(result)
            })
            .catch((err) => {
              next(err)
            })
        }
      })
  }

  static showCart(req, res, next) {
    Cart.findAll({
        where: {
          UserId: +req.userData.id
        },
        include: Product
      })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static updateCart(req, res, next) {

    const id = req.params.ProductId
    const {
      qty
    } = req.body

    Cart.findOne({
        where: {
          id
        },
        include: Product
      })
      .then((result) => {
        if (qty > 0) {
          if (result.Product.stock < result.quantity + 1) {
            res.status(400).json({
              message: 'Quantity has reached its limit'
            })
          } else {
            return Cart.update({
                quantity: result.quantity + 1
              }, {
                where: {
                  id
                }
              })
              .then((data) => {
                res.status(200).json(data)
              })
          }
        } else {
          if (result.quantity - 1 < 1) {
            res.status(400).json({
              message: 'Cart cannot less than one'
            })
          } else {
            return Cart.update({
                quantity: result.quantity - 1
              }, {
                where: {
                  id
                }
              })
              .then((data) => {
                res.status(200).json(data)
              })
          }
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    const id = +req.params.ProductId
    Cart.destroy({
        where: {
          id
        }
      })
      .then((result) => {
        res.status(200).json({
          result
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = CartController