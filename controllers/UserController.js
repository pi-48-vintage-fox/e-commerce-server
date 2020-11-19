'use strict'

const { User } = require("../models")
const { compareHash } = require("../helpers/hash")
const { signToken } = require("../helpers/jwt")

class UserController {

  static async login(req, res, next) {
    try {
      let data = {
        email: req.body.email,
        password: req.body.password
      }

      if (!data.email || !data.password) throw { msg: "Email/Password cannot be empty", status: 400 }

      let user = await User.findOne({
        where: {
          email: data.email
        }
      })
      if (user && compareHash(data.password, user.password)) {
        let access_token = signToken({
          id: user.id,
          email: user.email,
          role: user.role
        })
        res.status(200).json({
          msg: "Login Success",
          access_token
        })
      } else {
        throw { msg: "Wrong Email/Password", status: 401 }
      }

    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      let data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: "customer"
      }

      let user = await User.create(data)

      res.status(200).json({
        msg: "User Created",
        user
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = UserController
