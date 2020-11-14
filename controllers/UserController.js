const { User } = require('../models')
const { comparePassword, signToken } = require('../helpers/auth')

class UserController {
  // static login(req, res, next) {
  //   // console.log(req.body, '<<<<<<<<<<<<<<<<<<<<<<<<, req body')
  //   const { email, password } = req.body
  //   if (!email || !password) {
  //     throw { status: 400, msg: 'Email / password was not provided' }
  //   }

  //   const payload = {
  //     email: req.body.email,
  //     password: req.body.password,
  //   }

  //   console.log({ payload })

  //   // Try finding user with his/her email address
  //   User.findOne({
  //     where: { email: payload.email },
  //   })
  //     .then((user) => {
  //       if (!user) {
  //         next({ status: 401, msg: 'Invalid email or password' })
  //       } else if (!comparePassword(payload.password, user.password)) {
  //         // User is found, but the password given is wrong
  //         next({ status: 401, msg: 'Invalid email or password' })
  //       } else {
  //         // User is found using his/her email address
  //         // console.log(JSON.stringify(user, null, 2))
  //         const access_token = signToken({
  //           id: user.id,
  //           email: user.email,
  //         })

  //         res.status(200).json({
  //           access_token,
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       next(err)
  //     })
  // }
  static async login(req, res, next) {
    console.log(req.body, '<<<<<<<<<<<<<<<<<<<<<<<<, req body')
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw { status: 400, msg: 'Email / password was not provided' }
      }

      const payload = {
        email: req.body.email,
        password: req.body.password,
      }

      console.log({ payload })

      // Try finding user with his/her email address
      let user = await User.findOne({
        where: { email: payload.email },
      })

      if (!user) {
        next({ status: 401, msg: 'Invalid email or password' })
      } else if (!comparePassword(payload.password, user.password)) {
        // User is found, but the password given is wrong
        next({ status: 401, msg: 'Invalid email or password' })
      } else {
        // User is found using his/her email address
        console.log(JSON.stringify(user, null, 2))
        const access_token = signToken({
          id: user.id,
          email: user.email,
        })

        res.status(200).json({
          access_token,
        })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async findOrgMembers(req, res, next) {
    try {
      const members = await User.findAll()

      res.status(200).json(members)
    } catch (error) {
      console.log(error, '\n^----- error find org members')
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      const user = await User.findByPk(+req.params.UserId)

      if (!user) {
        next({ status: 404, msg: 'User was not found' })
      } else {
        res.status(200).json(user)
      }
    } catch (error) {
      console.log(error, '\n^----- error find user by id')
      next(error)
    }
  }

  static async putUser(req, res, next) {
    console.log(
      req.body,
      '\n^----put task controller\n============================'
    )

    try {
      let { UserId } = req.params

      if (!(await User.findByPk(UserId))) {
        throw { status: 404, msg: 'User was not found' }
      }

      const { name, username, imageUrl, imageId, password } = req.body

      const input = { name, username, imageUrl, imageId, password }

      try {
        await User.update(input, {
          where: { id: UserId },
        })

        res.status(200).json({ msg: 'User was modified successfully' })
      } catch (error) {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    console.log(req.body)
    console.log('register')

    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
      }

      const user = await User.create(payload)

      console.log({ user })

      res.status(201).json({
        msg: 'Account registration successful',
      })
    } catch (error) {
      console.log(error, '\n^----- error registering user')
      next(error)
    }
  }

  static async getUserDetails(req, res, next) {
    console.log("fetching user's details")

    try {
      const user = await User.findByPk(req.user.id, {
      })
      const { id, name, email, imageUrl, imageId } = user
      let output = {
        id,
        name,
        email,
        imageUrl,
        imageId,
      }
      res.status(200).json(output)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = UserController
