const { User, Product } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class Auth {

  static authentication(req, res, next) {
    const { access_token } = req.headers
    if (!access_token) {
      res.status(401).json({
        message: 'Authentication failed 0'
      })
    } else {
      const decoded = verifyToken(access_token)
      User.findOne({
        where: {
          role: "admin"
        }
      })
        .then(data => {
          if (!data) {
            res.status(401).json({
              message: 'Authentication failed 1'
            })
          } else if (data.role !== 'admin') {
            res.status(401).json({
              message: 'Authentication failed 2'
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

  static authorization(req, res, next) {
    const { id } = req.params
    Product.findAll(id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: 'Product not found'
          })
        } else if (data.UserId === req.loggedInUser.id) {
          next(err)
        } else {
          res.status(401).json({
            message: 'Not authorized'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = Auth