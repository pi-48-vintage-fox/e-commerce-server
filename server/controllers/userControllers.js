const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


class userController {
  static login(req, res, next) {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    if (obj.email == '' || obj.email == '') {
      throw {name: 'Authentication Failed', message: "Please required Email and password"}
    }
    User.findOne({
      where: {
        email: obj.email
      }
    })
    .then(data => {
      // console.log(data);
      if (!data) {
        throw {name: 'Authentication Failed', message: "Wrong Email/password!"}
      } else if (!comparePassword(obj.password, data.password)) {
        throw{
          name: 'Authentication Failed', 
          message: "Wrong Email/password!"
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