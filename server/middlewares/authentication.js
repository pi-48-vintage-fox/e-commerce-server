const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models/index');

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try {
    if(!access_token) {
      throw { msg: 'Authentication failed! You have to login first', status: 401 }
    }
    else {
      const decoded = verifyToken(access_token)
      let user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if(!user) {
        throw { msg: 'Authentication failed! User not found', status: 401 }
      }
      else {
        req.userLogin = decoded
        next()
      }
    }
  } 
  catch (err) {
    const status = err.status || 500
    const msg = err.msg || "Internal Server Error!"
    res.status(status).json({ msg })
  }
}

module.exports = authentication