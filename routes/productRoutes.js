'use strict'
const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middlewares/AuthMiddleware');
const productRoutes = express.Router()

productRoutes.get("/products",ProductController.index)
productRoutes.post("/products/",authentication, ProductController.create)
productRoutes.put("/products/:id",authentication, ProductController.update)
productRoutes.delete("/products/:id",authentication, ProductController.delete)
productRoutes.patch("/products/:id/updatecategory",authentication, ProductController.updateCategory)


module.exports = productRoutes