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
  try {
    // if (!req.body.CartId) {
    //   throw { status: 400, msg: 'CartId is required' }
    // }
    // const { CartId } = req.body
    const { id } = req.user

    const cart = await Cart.findOne({
      where: {
        UserId: id,
        status: 'new',
      },
    })

    if (!cart) {
      throw { status: 404, msg: 'Cart was not found' }
    }

    const CartId = cart.id

    // if (!req.body.CartId && req.body.CartProductId) {
    //   try {
    //     const cartitem = await CartProduct.findByPk(req.body.CartProductId)
    //     if (!cartitem) {
    //       throw { status: 404, msg: 'Cart was not found' }
    //     }

    //     console.log(cartitem.toJSON(), '<<<< cart item, authorization')
    //     CartId = cartitem.CartId
    //     try {
    //       console.log({ CartId }, '<<<<< CartId, authorization')
    //       const cart = await Cart.findByPk(CartId)

    //       if (!cart) {
    //         throw { status: 404, msg: 'Cart was not found' }
    //       }

    //       console.log(cart.toJSON(), '<<<<<< authorization, cart')

    //       if (cart.UserId != id) {
    //         throw { status: 403, msg: 'Not authorized' }
    //       }

    //       req.cart.id = CartId

    //       next()
    //     } catch (error) {
    //       next(error)
    //     }
    //   } catch (error) {
    //     next(error)
    //   }
    // } else {

    console.log(cart.toJSON(), '<<<<<< authorization, cart')

    console.log('Cart user id:', cart.UserId, 'req user id:', id)

    if (cart.UserId != id) {
      throw { status: 403, msg: 'Not authorized' }
    }

    req.CartId = CartId
    console.log('authorization check passed')
    console.log(req.CartId)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isAdmin,
  isNotAdmin,
  isCartOwner,
}
