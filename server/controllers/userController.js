const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static login(req, res, next) {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: obj.email
      }
    })
      .then(data => {
        if(!data) {
          res.status(401).json({
            message: "Email/password is wrong!"
          })
        }
        else if(!comparePassword(obj.password, data.password)) {
          res.status(401).json({
            message: "Password is wrong!"
          })
        }
        else {
          const access_token = signToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            access_token
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController