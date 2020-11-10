'use strict'
const express = require('express');
const UserController = require('../controllers/UserController');
const productRoutes = require('./productRoutes');
const Routes = express.Router()


Routes.post("/login",UserController.login)
Routes.post("/register",UserController.register)

Routes.use(productRoutes)
module.exports = Routes