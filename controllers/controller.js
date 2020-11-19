const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { Admin, Product, Cart } = require('../models/index')

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

    static async register (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                role: "customer"
            }
            const user = await Admin.create(payload)
            res.status(201).json({
                id: user.id,
                email: user.email,
                role: user.role
            })
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
                category: req.body.category
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
                category: req.body.category
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

    //CART
    static async showCart (req, res, next) {
        try {
            const data = await Cart.findAll({
                include: Product,
                where: {
                    UserId: req.loggedIn.id,
                    status: "cart"
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addCart (req, res, next) {
        try {
            let UserId = req.loggedIn.id
            let ProductId = +req.params.id
            let quantityInput = 1
            const product = await Product.findByPk(+req.params.id)
            const dataCart = await Cart.findOne({
                where: {
                    UserId,
                    ProductId,
                    status: 'cart'
                }
            })
            if(dataCart) {
                let qty = dataCart.quantity + quantityInput
                if(qty > product.stock) {
                    throw err
                } else {
                    let payload = {
                        quantity: qty,
                        total_price: qty * product.price
                    }
                    const data = await Cart.update(payload, {
                        where: {
                            id: dataCart.id
                        }
                    })
                    res.status(200).json(data)
                }
            } else {
                const qty = 1
                const data = await Cart.create({
                    UserId,
                    ProductId,
                    quantity: 1,
                    status: 'cart',
                    total_price: qty * product.price
                })
                res.status(201).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static async updatePlusCart (req, res, next) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            const product = await Product.findByPk(cart.ProductId)
            if(cart.quantity >= product.stock) {
                next(err)
            } else {
                let payload = {
                    quantity: +req.body.quantity,
                    total_price: +req.body.quantity * product.price
                }
                const data = await Cart.update(payload, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json({ message: 'Your cart has been updated'})
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async updateMinusCart (req, res, next) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            const product = await Product.findByPk(cart.ProductId)
            if(cart.quantity <= 1) {
                next(err)
            } else {
                let payload = {
                    quantity: +req.body.quantity,
                    total_price: +req.body.quantity * product.price
                }
                const data = await Cart.update(payload, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json({ message: 'Your cart has been updated'})
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async deleteCart (req, res, next) {
        try {
            const data = await Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: 'Your cart has been deleted'})
        } catch (err) {
            next(err)
        }
    }

    static async checkout (req, res, next) {
        try {
            const cart = await Cart.findAll({
                include: Product,
                where: {
                    UserId: req.loggedIn.id,
                    status: "cart"
                }
            })
            for(const key of cart) {
                const restStock = {
                    stock: key.Product.stock - key.quantity
                }
                await Product.update(restStock, {
                    where: {
                        id: key.Product.id
                    }
                })
                const payload = {
                    status: "transaction"
                }
                await Cart.update(payload, {
                    where: {
                        id: key.id
                    }
                })
                res.status(200).json({ message: 'Transaction success'})
            }
            
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    //TRANSACTIONS
    static async showTransactions (req, res, next) {
        try {
            const data = await Cart.findAll({
                include: Product,
                where: {
                    UserId: req.loggedIn.id,
                    status: "transaction"
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
}
}

module.exports = Controller