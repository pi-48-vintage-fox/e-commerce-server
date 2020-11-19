'use strict'
const { User, Product, Cart } = require('../models')

class CartController {
    static async addCart(req, res, next) {
        const productId = +req.params.productId
        const input = {
            ProductId: productId,
            UserId: req.userData.id,
            quantity: +req.body.quantity,
            status: 'unpaid'
        }
        try {
            let cart = {}
            const productChosen = await Product.findOne({
                where: {
                    id: productId
                }
            })
            const cartList = await Cart.findOne({
                where: {
                    ProductId: productId,
                    UserId: input.UserId
                }
            })
        
            if (productChosen.stock < input.quantity) {
                res.status(400).json({ message: 'Not enough stock.' })
            } else if (productChosen.stock === 0) {
                res.status(400).json({ message: 'Stock is empty.' })
            } else {
                if (!cartList) {
                    const newCart = await Cart.create(input)
                    cart = newCart

                } else {
                    const updateCart = await Cart.update({
                        quantity: cartList.quantity + input.quantity
                    }, {
                        where: {
                            ProductId: productId
                        },
                        returning: true
                    })
                    cart = updateCart[1][0]
                }
                const product = await Product.findByPk(productId)
                const productUpdate = await Product.update({
                    stock: (product.stock - input.quantity)
                }, {
                    where: {
                        id: productId
                    },
                    returning: true
                })
                if (productUpdate[1][0].stock < 0) {
                    throw err
                } else {
                    res.status(201).json(cart)
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async fetchCarts(req, res, next) {
        const userId = req.userData.id
        try {
            const data = await Cart.findAll({
                where: {
                    UserId: userId
                },
                include: [Product]
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async editCart(req, res, next) {
        const cartId = req.params.id
        const input = {
            status: req.body.status,
            quantity: +req.body.quantity
        }
        try {
            let newQuantity = 0
            const data = await Cart.findOne({
                where: {
                    id: cartId,
                    UserId: req.userData.id
                }
            })
            const product = await Product.findByPk(data.ProductId)
            if (input.quantity > product.stock + data.quantity) {
                res.status(400).json({ message: 'Not enough stock.' })
            } else {
                newQuantity = input.quantity - data.quantity
                const productUpdate = await Product.update({ stock: product.stock - newQuantity }, {
                    where: {
                        id: data.ProductId
                    }
                })
                const cartUpdate = await Cart.update(input, {
                    where: {
                        id: cartId
                    },
                    returning: true
                })
                res.status(200).json(cartUpdate[1][0])
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async deleteCart(req, res, next) {
        const cartId = req.params.id
        try {
            const cart = await Cart.findOne({
                where: {
                    id: cartId
                }
            })
            const product = await Product.findByPk(cart.ProductId)
            const updateProduct = await Product.update({ stock: cart.quantity + product.stock },
                {
                    where: {
                        id: cartId
                    }
                })
                const deleteCart = await Cart.destroy({
                where: {
                    id: cartId
                }
            })
            if(deleteCart === 1) {
                res.status(200).json({message: "Cart has been deleted."})
            } else {
                res.status(404).json({message: "Cart not Found."})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CartController