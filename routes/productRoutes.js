'use strict'
const express = require('express');
const ProductController = require('../controllers/ProductController');
const productRoutes = express.Router()

productRoutes.get("/products",ProductController.index)
productRoutes.post("/products/",ProductController.create)
productRoutes.put("/products/:id",ProductController.update)
productRoutes.delete("/products/:id",ProductController.delete)

module.exports = productRoutes