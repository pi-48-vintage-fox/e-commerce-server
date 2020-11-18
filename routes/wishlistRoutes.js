'use strict'
const express = require('express');
const { authentication } = require('../middlewares/AuthMiddleware');
const WishlistController = require('../controllers/WishlistController');
const wishListRoutes = express.Router()

wishListRoutes.get('/wishlist',authentication, WishlistController.index)
wishListRoutes.post('/wishlist',authentication, WishlistController.insert)
wishListRoutes.delete('/wishlist/:id',authentication, WishlistController.delete)

module.exports = wishListRoutes