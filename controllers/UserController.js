'use strict'

const { User } = require('../models/index')
const { compareHash } = require('../helpers/hash')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async login(req, res, next) {
    console.log(req.body, '<><><><><><><><><><><> ini req.bodeh')
    try {
      let options = {
        where: {
          email: req.body.email
        }
      }
      let user = await User.findOne(options)
      if (!user) {
        throw { msg: "Email/Password is wrong", status: 404 }
      }
      else if (compareHash(req.body.password, user.password)) {
        let access_token = signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token
        })
      }
      else {
        throw { msg: "Not authorize", status: 401 }
      }
    } catch (err) {
      
      return next(err)
    }
  } 
}


module.exports = UserController