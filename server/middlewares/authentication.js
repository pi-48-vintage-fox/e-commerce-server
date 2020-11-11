const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class Authentication {

  static authentication(req, res, next) {
    const { access_token } = req.headers
    if (!access_token) {
      res.status(401).json({
        message: 'Authentication failed'
      })
    } else {
      const decoded = verifyToken(access_token)
      User.findOne({
        where: {
          email: decoded.email
        }
      })
        .then(data => {
          if (!data) {
            res.status(401).json({
              message: 'Authentication failed'
            })
          } else {
            req.loggedInUser = decoded
            next()
          }
        })
        .catch(err => {
          next(err)
        })
    }
  }
  
}

module.exports = Authentication