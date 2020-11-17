'use strict'

const { User } = require('../models/index')
const { compareHash } = require('../helpers/hash')
const { signToken } = require('../helpers/jwt')

class UserController {

  static async register(req, res, next) {
    try {
      let data = {
        email: req.body.email,
        password: req.body.password
      }
      let user = await User.create(data)
      res.status(201).json({
        email: user.email,
        role: user.role
      })
    } catch (error) {
      return next(error)
    }
  }

  static async login(req, res, next) {
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
          email: user.email,
          role: user.role
        })
        res.status(200).json({
          access_token,
          role: user.role
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