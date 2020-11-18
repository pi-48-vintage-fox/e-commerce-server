'use strict'
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authentication } = require('../middlewares/AuthMiddleware');
const categoryRoutes = express.Router()


// Category
categoryRoutes.get('/product/categories', authentication, CategoryController.index)
categoryRoutes.post('/product/categories', authentication, CategoryController.insert)
categoryRoutes.put('/product/categories/:id', authentication, CategoryController.update)
categoryRoutes.delete('/product/categories/:id', authentication, CategoryController.delete)

module.exports = categoryRoutes
