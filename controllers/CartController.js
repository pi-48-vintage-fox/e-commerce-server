const { Cart, CartProduct, Product } = require('../models')

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

  static async current(req, res, next) {
    console.log('find currently active cart')
    console.log(req.params, '<<< req.params')

    try {
      const cart = await Cart.findOne({
        where: {
          status: 'new',
          UserId: req.user.id,
        },
        include: [
          {
            model: CartProduct,
            include: Product,
          },
        ],
      })

      if (!cart) {
        try {
          const newCart = await Cart.create(
            {
              UserId: req.user.id,
            },
            {
              include: [
                {
                  model: CartProduct,
                  include: Product,
                },
              ],
            }
          )

          res.status(200).json(newCart)
        } catch (error) {
          next(error)
        }
      } else {
        res.status(200).json(cart)
      }
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    console.log('add cart')
    console.log(req.params, 'req.params')

    // Check if there's currently active cart
    try {
      const cart = await Cart.findOne({
        where: {
          status: 'new',
        },
      })

      if (cart) {
        throw {
          status: 400,
          msg: "There's an active cart, cannot create a new one",
        }
      }
    } catch (error) {
      next(error)
    }
    try {
      const cart = await Cart.create({
        UserId: req.user.id,
      })

      res.status(201).json(cart)
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    console.log('update status')
    console.log(req.body, '<<<<< req.body')
    console.log(req.params, '<<<<< req.params')
    try {
      const updatedCart = await Cart.update(req.body, {
        where: {
          id: req.body.CartId,
        },
        returning: true,
      })

      res.status(200).json(updatedCart)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    console.log('delete')
    console.log(req.params, '<<<<< req.params')
    try {
      await Cart.destroy({
        where: {
          id: req.params.CartId,
        },
      })
      res.status(200).json({ msg: 'Cart was deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController
