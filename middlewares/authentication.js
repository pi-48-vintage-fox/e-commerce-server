const { verifyToken } = require('../helpers/auth')
const { User } = require('../models')

async function authentication(req, res, next) {
  console.log('authentication')
  // console.log(req.params, '<<< req params authentication')
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw { msg: 'Not authenticated', status: 401 }
    }

    console.log({access_token})

    const decoded = verifyToken(access_token)

    console.log({ decoded })

    const user = await User.findByPk(decoded.id)

    // console.log(user.toJSON())

    if (!user) {
      console.log('user not found')
      throw { msg: 'Not authenticated', status: 401 }
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = authentication
