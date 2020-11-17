const { Cart } = require('../models')

class CartController {
  static async findAll(req, res, next) {
    console.log('find all carts')
    console.log(req.params, 'req.params')
    try {
      const carts = await Cart.findAll({
        where: {
          UserId: req.user.id,
        },
      })

      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    console.log('find cart by id')
    console.log(req.params, 'req.params')

    try {
      const cart = await Cart.findByPk(req.params.CartId)
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    console.log('add cart')
    console.log(req.params, 'req.params')
    try {
      const cart = await Cart.create({
        UserId: req.user.id,
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      await Cart.update(req.body)

      res.status(200).json({ msg: 'Cart status was modified successfully' })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      await Cart.destroy({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({ msg: 'Cart was deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController
