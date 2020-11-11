const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { Admin, Product } = require('../models/index')

class Controller {
    // ADMIN
    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await Admin.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                })

                res.status(200).json({
                    access_token,
                    id: user.id,
                    email: user.email
                })
            }
        } catch (err) {
            next(err)
        }
    }

    //PRODUCT
    static async show(req, res, next) {
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const data = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
            }
            const newProduct = await Product.create(data)
            res.status(201).json(newProduct)
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const data = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
            }
            const editProduct = await Product.update(data, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: 'Product has been updated' })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const deletedProduct = await Product.destroy({
                where: {
                    id: req.params.id
                }
            }) 
            res.status(200).json({ message: 'Product has been deleted' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller