const { User, Cart } = require('../models')

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

  const { CartId } = req.body
  const { id } = req.user

  try {
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

module.exports = {
  isAdmin,
  isNotAdmin,
  isCartOwner,
}
