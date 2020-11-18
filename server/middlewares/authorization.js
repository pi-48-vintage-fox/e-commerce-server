const { User, Cart } = require('../models/index')

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

function customerAuth(req, res, next) {
  const UserId = req.userLogin.id

  Cart.findOne({
    where: {UserId: UserId}
  })
  .then(data => {
    console.log(data)
    console.log(UserId, 'ini userid')
    if(!data) {
      throw { msg: 'Cart not found!', status: 404}
    }
    else if(data.UserId === UserId) {
      next()
    }
    else {
      throw { msg: 'You are not authorized!', status: 401 }
    }
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
}

module.exports = {
  authorization,
  customerAuth
}