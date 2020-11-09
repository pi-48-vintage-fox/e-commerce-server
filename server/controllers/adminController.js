const { Admin } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class AdminController {

  static register(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    Admin.create(obj)
      .then(data => {
        if (!data) {
          res.status(400).json({
            message: 'Email has been register!'
          })
        }
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const obj = {
      emal: req.body.email,
      password: req.body.password
    }
    Admin.findOne({
      where: {
        email: obj.email
      }
    })
      .then(data => {
        if (!data) {
          res.status(401).json({
            message: 'Email/password salah'
          })
        } else if (!comparePassword(obj.password, dat.password)) {
          res.status(401).json({
            message: 'Email/password salah'
          })
        } else {
          const acess_token = signToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            acess_token
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = AdminController