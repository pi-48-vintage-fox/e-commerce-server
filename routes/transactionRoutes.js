'use strict'
const express = require('express');
const TransactionController = require('../controllers/TransactionController');
const { authentication } = require('../middlewares/AuthMiddleware');
const transactionRoutes = express.Router()

// history transactions
transactionRoutes.get('/transactions',authentication,TransactionController.getHistory)

// checkout only
transactionRoutes.post('/checkout',authentication,TransactionController.checkOut)

// cart
transactionRoutes.get('/cart',authentication,  TransactionController.getCartItems)
transactionRoutes.post('/cart',authentication, TransactionController.newCartItem)
transactionRoutes.put('/cart',authentication, TransactionController.updateCartItem)
transactionRoutes.delete('/cart',authentication, TransactionController.deleteCartItem)

module.exports = transactionRoutes

// TODO
/*
  - Routes
  - WISHLIST!
  - CONTROLLERS
  - liat table carts sama transaction details , itu sama fungsinya
*/