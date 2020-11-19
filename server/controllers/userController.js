const {
  User
} = require('../models')
const {
  generateToken
} = require('../helpers/jwt')
const {
  comparePassword
} = require('../helpers/bcrypt')

class UserController {

  static login(req, res, next) {

    const userData = {
      email: req.body.email,
      password: req.body.password
    }

    if (!userData.email || !userData.password) {
      return next({
        name: "BadRequest",
        message: "Please input email and password!"
      })
    }

    User.findOne({
        where: {
          email: userData.email
        }
      })

      .then((data) => {
        if (!data) {
          return next({
            name: "BadRequest",
            message: "Invalid account!"
          })
        } else {
          if (comparePassword(userData.password, data.password)) {
            const access_token = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              access_token,
              full_name: data.full_name
            })
          } else {
            return next({
              name: "Unauthorized",
              message: "Wrong Email/ Password"
            })
          }
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static register(req, res, next) {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name
    }

    User.create(userData)
      .then((result) => {
        if (!result) {
          next({
            name: "BadRequest",
            message: "You can't register with this format"
          })
        } else {
          const {
            id,
            email,
            full_name
          } = result
          res.status(201).json({
            id,
            email,
            full_name
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

}

module.exports = UserController