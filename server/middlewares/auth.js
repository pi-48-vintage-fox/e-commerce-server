const {
  verifyToken
} = require('../helpers/jwt')
const {
  User
} = require('../models')

function authentication(req, res, next) {
  const {
    access_token
  } = req.headers
  if (access_token) {
    req.userData = verifyToken(access_token)
    User.findByPk(req.userData.id)
      .then((result) => {
        if(!result) {
          next({})
        } else {
          next()
        }
      })
      .catch((err) => {
        res.status(500).json({message: err.message})
      })
  } else {
    res.status(401).json({message: "Failed to Authenticate"})
  }
}


function authorization(req, res, next) {
  User.findByPk(req.userData.id)
    .then((user) => {
      if(user.role == 'admin'){
        next()
      } else {
        next({
          name: "Unauthorized"
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  authentication,
  authorization
}