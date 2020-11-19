const { User, Cart, CartProduct } = require('../models')

async function isAdmin(req, res, next) {
  console.log('authorization: is admin')
  console.log(req.user, '<<< req.user')

  try {
    const user = await User.findByPk(req.user.id)
    if (user.role != 'admin') {
      throw { status: 403, msg: 'Not authorized' }
    }

    next()
  } catch (error) {
    next(error)
  }
}

async function isNotAdmin(req, res, next) {
  console.log('authorization: is not admin')
  console.log(req.user, '<<< req.user')

  try {
    const user = await User.findByPk(req.user.id)

    if (user.role == 'admin') {
      throw {
        status: 403,
        msg: 'Admin accounts are not authorized to make transactions',
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

async function isCartOwner(req, res, next) {
  console.log('authorization: is cart owner')
  console.log(req.params, '<<< req.params')
  console.log(req.body, '<<< req.body')
  console.log(req.user, '<<< req.user')

  const { id } = req.user

  let CartId

  if (!req.body.CartId && req.body.CartProductId) {
    try {
      const cartitem = await CartProduct.findByPk(req.body.CartProductId)
      if (!cartitem) {
        throw { status: 404, msg: 'Cart was not found' }
      }

      console.log(cartitem.toJSON(), '<<<< carti item, authorization')
      CartId = cartitem.CartId
      try {
        console.log({ CartId }, '<<<<< CartId, authorization')
        const cart = await Cart.findByPk(CartId)

        if (!cart) {
          throw { status: 404, msg: 'Cart was not found' }
        }

        console.log(cart.toJSON(), '<<<<<< authorization, cart')

        if (cart.UserId != id) {
          throw { status: 403, msg: 'Not authorized' }
        }

        next()
      } catch (error) {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  } else {
    CartId = req.body.CartId
    try {
      console.log({ CartId }, '<<<<< CartId, authorization')

      const cart = await Cart.findByPk(CartId)

      if (!cart) {
        throw { status: 404, msg: 'Cart was not found' }
      }

      console.log(cart.toJSON(), '<<<<<< authorization, cart')

      if (cart.UserId != id) {
        throw { status: 403, msg: 'Not authorized' }
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  isAdmin,
  isNotAdmin,
  isCartOwner,
}
