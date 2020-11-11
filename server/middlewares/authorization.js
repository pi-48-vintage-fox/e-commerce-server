const { Product } = require('../models')

class Authorization {

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

module.exports = Authorization