const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


class userController {
  static login(req, res, next) {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }

    if (!obj.email || !obj.password) {
      throw {name: "BadRequest", message: "Please, required email and password"}
    }
    User.findOne({
      where: {
        email: obj.email
      }
    })
    .then(data => {
      if(!comparePassword(obj.password, data.password)) {
        throw{
          name: 'Unauthorized', 
          message: "Wrong email/password!"
        }
      } else {
        const access_token = signToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({access_token})
      }
    })
    .catch(err => {
      next(err)
    })
  
  }
}

module.exports = userController