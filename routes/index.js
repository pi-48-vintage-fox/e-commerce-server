'use strict'
const express = require('express');
const UserController = require('../controllers/UserController');
const productRoutes = require('./productRoutes');
const bannerRoute = require('./bannerRoutes');
const Routes = express.Router()


Routes.post("/login",UserController.login)
Routes.post("/register",UserController.register)

Routes.use(productRoutes)
Routes.use(bannerRoute)
module.exports = Routes