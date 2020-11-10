'use strict'
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        const newAccount = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(newAccount)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const account = {
            email: req.body.email,
            password: req.body.password
        }
        if (account.email === '' || account.password === '') {
            next({ name: 'Empty email/password' })
        } else {
            try {
                const data = await User.findOne({
                    where: {
                        email: account.email
                    }
                })
                if (!data) {
                    next({ name: 'Wrong Email and Password' })
                } else if (!comparePassword(account.password, data.password)) {
                    next({ name: 'Wrong Email and Password' })
                } else {
                    const access_token = signToken({ id: data.id, email: data.email })
                    res.status(200).json({ access_token: access_token })
                }
            } catch (err) {
                next(err)
            }
        }
    }
}
module.exports = UserController