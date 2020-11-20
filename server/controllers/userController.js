const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(payload)
      .then(data => {
        if (!data) {
          res.status(400).json({
            message: 'Email has been register'
          })
        } else {
          res.status(201).json({
            id: data.id,
            email: data.email
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: payload.email
      }
    })
      .then(data => {
        if (!data) {
          res.status(401).json({
            message: 'Wrong email/password'
          })
        } else if (!comparePassword(payload.password, data.password)) {
          res.status(401).json({
            message: 'Wrong email/password 1'
          })
        } else {
          const access_token = signToken({
            id: data.id,
            name: data.id,
            email: data.email,
            role: data.role
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