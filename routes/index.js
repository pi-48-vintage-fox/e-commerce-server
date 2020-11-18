'use strict'
const express = require('express');
const UserController = require('../controllers/UserController');
const productRoutes = require('./productRoutes');
const bannerRoute = require('./bannerRoutes');
const categoryRoutes = require('./categoryRoutes');
const wishListRoutes = require('./wishlistRoutes');
const Routes = express.Router()


Routes.post("/login",UserController.login)
Routes.post("/register",UserController.register)

Routes.use(productRoutes)
Routes.use(bannerRoute)
Routes.use(categoryRoutes)
Routes.use(wishListRoutes)
module.exports = Routes