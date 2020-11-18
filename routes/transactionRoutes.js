'use strict'
const express = require('express');
const TransactionController = require('../controllers/TransactionController');
const transactionRoutes = express.Router()

// history transactions
transactionRoutes.get('/transactions',TransactionController.getHistory)

// checkout only
transactionRoutes.post('/checkout',TransactionController.checkOut)

// cart
transactionRoutes.get('/cart', TransactionController.getCartItems)
transactionRoutes.post('/cart',TransactionController.newCartItem)
transactionRoutes.put('/cart',TransactionController.updateCartItem)
transactionRoutes.delete('/cart',TransactionController.deleteCartItem)

module.exports = transactionRoutes

// TODO
/*
  - Routes
  - WISHLIST!
  - CONTROLLERS
  - liat table carts sama transaction details , itu sama fungsinya
*/