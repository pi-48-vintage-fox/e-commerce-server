const { Cart, Product } = require('../models')

class CartController {
    static async show(req, res, next) {
        try {
            const data = await Cart.findAll({
                include: Product, where: {
                    UserId: req.userLogin.id,
                    status: 'pending'
                },
                order: [['id', 'ASC']]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async add(req, res, next) {
        try {
            const { ProductId } = req.body
            const payload = {
                UserId: req.userLogin.id,
                ProductId,
                qty: 1
            }
            const dataCart = await Cart.findOne({
                include: Product, where: {
                    UserId: req.userLogin.id,
                    ProductId,
                    status: 'pending'
                }
            })
            if (!dataCart) {
                const dataProduct = await Product.findOne({ where: { id: ProductId } })
                if (dataProduct.stock >= 1) {
                    const addCart = await Cart.create(payload)
                    res.status(201).json(addCart)
                } else {
                    throw { name: 'Out of Stock' }
                }
            } else {
                if (dataCart.qty < dataCart.Product.stock) {
                    const updateCart = await Cart.increment('qty', {
                        where: {
                            ProductId
                        }
                    })
                    res.status(200).json(updateCart[0][0][0])
                } else {
                    throw { name: 'Out of Stock' }
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { qty } = req.body
            const dataCart = await Cart.findOne({ include: Product, where: { id } })
            if (!dataCart) {
                throw { name: 'Data Not Found' }
            }
            else if (qty < 0) {
                if (dataCart.qty > Math.abs(qty)) {
                    const updateCart = await Cart.increment({ qty }, {
                        where: {
                            id
                        }
                    })
                    res.status(200).json(updateCart[0][0][0])
                } else {
                    throw { name: 'You have reach minimum ammount to checkout' }
                }
            }
            else {
                if (dataCart.qty < dataCart.Product.stock) {
                    const updateCart = await Cart.increment('qty', {
                        where: {
                            id
                        }
                    })
                    res.status(200).json(updateCart[0][0][0])
                } else {
                    throw { name: 'Out of Stock' }
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const data = await Cart.destroy({ where: { id } })
            if (data === 1) {
                res.status(200).json({ msg: 'Cart Deleted' })
            } else {
                throw { name: "Data Not Found" }
            }
        } catch (error) {
            next(error)
        }
    }

    static async checkout(req, res, next) {
        try {
            const myCart = await Cart.findAll({
                include: Product, where: {
                    UserId: req.userLogin.id,
                    status: 'pending'
                }
            })
            for (const iterator of myCart) {
                const lastStock = {
                    stock: iterator.Product.stock - iterator.qty
                }
                await Product.update(lastStock, {
                    where: {
                        id: iterator.Product.id
                    }
                })
                const paid = {
                    status: 'paid'
                }
                await Cart.update(paid, {
                    where: {
                        id: iterator.id
                    }
                })
                res.status(200).json({ msg: 'Checkout Completed' })
            }
        } catch (error) {
            next(error)
        }
    }

    static async history(req, res, next) {
        try {
            const data = await Cart.findAll({
                include: Product, where: {
                    UserId: req.userLogin.id,
                    status: 'paid'
                }, order: [['id', 'ASC']]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController