const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { Admin, Product } = require('../models/index')

class Controller {
    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const admin = await Admin.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!admin) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else {
                const id = admin.id
                const name = admin.name
                const access_token = signToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })

                res.status(200).json({
                    access_token,
                    id,
                    name
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller