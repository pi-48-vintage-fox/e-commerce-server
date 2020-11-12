const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try{
    if (!access_token) {
      throw {name: 'Authentication Failed', message: "Wrong Email/password!", status: 401}
    } else if(access_token) {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if (!user) {
        throw {name: 'Authentication Failed', message: "Authentication failed!", status: 401}
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  }
  catch(err) {
    next(err)
  }
}



module.exports = authentication