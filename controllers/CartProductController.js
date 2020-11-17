const { CartProduct } = require('../models')

class CartProduct {
  static async findAll(req, res, next) {
    try {
      console.log('find all cart items')
      console.log(req.params, 'req.params')

      const items = await CartProduct.findAll({
        where: {
          CartId: req.params.CartId,
        },
      })

      res.status(200).json(items)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      console.log('find cart by id')
      console.log(req.params, 'req.params')

      const item = await Cart.findOne({
        where: {
          CartId: req.params.CartId,
          ProductId: req.params.ProductId,
        },
      })

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      console.log('add cart item')
      console.log(req.body, 'req.body')
      console.log(req.params, 'req.params')

      const item = await CartProduct.create({
        CartId: req.params.CartId,
        ProductId: req.params.ProductId,
        quantity: req.body.quantity,
      })

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      console.log('update cart item quantity')
      console.log(req.body, 'req.body')
      console.log(req.params, 'req.params')

      await CartProduct.update(
        {
          quantity: req.body.quantity,
        },
        {
          where: {
            CartId: req.params.CartId,
            ProductId: req.params.ProductId,
          },
        }
      )

      res.status(200).json({
        msg: "Cart item's quantity was modified succesfully",
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      console.log('remove item from cart')
      console.log(req.params, 'req.params')

      await CartProduct.destroy({
        where: {
          CartId: req.params.CartId,
          ProductId: req.params.ProductId,
        },
      })

      res.status(200).json({
        msg: 'Cart item was removed successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartProduct
