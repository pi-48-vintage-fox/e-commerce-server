const { User } = require('../models')
const { comparePassword, signToken } = require('../helpers/auth')

class UserController {
  static async googleLogin(req, res, next) {
    const token = req.body.token
    // console.log({token})

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()

      console.log({ payload })

      let user = {
        name: payload.name,
        email: payload.email,
        password: 'Hacktiv8',
        avatarUrl: payload.picture,
      }

      // console.log({user})

      const userData = await User.findOne({
        where: { email: user.email },
      })

      if (userData) {
        // console.log(userData.toJSON())
        // console.log('^----- user sdh ada di database')

        let { id } = userData

        const access_token = signToken({
          id: userData.id,
        })
        res.status(200).json({ access_token })
      } else {
        console.log('user belum ada di database, bikin sekarang')

        const newUser = await User.create(user)

        // console.log(newUser.toJSON())
        // console.log({id: newUser.id, email: newUser.email})
        // console.log('^----- data user yang akan dikasi access token')

        const access_token = signToken({
          id: newUser.id,
        })
        res.status(200).json({ access_token })
      }
    } catch (error) {
      console.log(error, '\n^----- google login error')
      next(error)
    }
  }

  static async adminlogin(req, res, next) {
    console.log(req.body, '<<<<<<, admin login, req body')
    try {
      const { email, password } = req.body

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

  static async login(req, res, next) {
    console.log(req.body, '<<<<<<<<<<<<<<<<<<<<<<<<, req body')
    try {
      const { email, password } = req.body

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

  static async findById(req, res, next) {
    try {
      const user = await User.findByPk(req.params.UserId)

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

  static async updateUser(req, res, next) {
    console.log(req.body, '\n^----user controller, req.body')

    try {
      let { UserId } = req.params

      if (!(await User.findByPk(UserId))) {
        throw { status: 404, msg: 'User was not found' }
      }

      const { name, imageUrl, imageId, password } = req.body

      const input = { name, imageUrl, imageId, password }

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
    console.log('register')
    console.log(req.body)

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
      const user = await User.findByPk(req.user.id, {})
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
