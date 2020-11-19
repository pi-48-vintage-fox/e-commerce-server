'use strict'
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authentication } = require('../middlewares/AuthMiddleware');
const categoryRoutes = express.Router()


// Category
categoryRoutes.get('/categories', CategoryController.index)
categoryRoutes.post('/categories', authentication, CategoryController.insert)
categoryRoutes.put('/categories/:id', authentication, CategoryController.update)
categoryRoutes.delete('/categories/:id', authentication, CategoryController.delete)

module.exports = categoryRoutes
