const { User } = require('../models/index')

function authorization(req, res, next) {
  const id = req.userLogin.id

  User.findByPk(id)
  .then(data => {
    if(data.role === 'admin') {
      next()
    }
    else {
      throw { name: "AuthFailed", msg: "Authorization failed! You cannot access this data", status: 401 }
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorization