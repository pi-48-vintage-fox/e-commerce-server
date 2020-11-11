const { User } = require('../models')

async function isAdmin(req, res, next) {
  console.log('authorization: is admin')

  try {
    const user = await User.findByPk(req.user.id)
    if (user.role != 'admin') {
      throw { status: 403, msg: 'Not authorized' }
    }

    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  isAdmin,
}
