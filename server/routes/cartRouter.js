'use strict'
const CartController = require('../controllers/CartController')
const cartRouter = require('express').Router()
const ProductController = require('../controllers/productController')
const authorization = require('../middlewares/authorization')

cartRouter.post('/carts/:productId', CartController.addCart)
cartRouter.get('/carts', CartController.fetchCarts)
cartRouter.put('/carts/:id', authorization, CartController.editCart)
cartRouter.delete('/carts/:id', authorization, CartController.deleteCart)

module.exports = cartRouter