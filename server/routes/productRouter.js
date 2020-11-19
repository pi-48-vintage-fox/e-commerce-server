'use strict'
const productRouter = require('express').Router()
const authorization = require('../middlewares/authorization')
const ProductController = require('../controllers/productController')

productRouter.post('/products', ProductController.addProduct)
productRouter.get('/products', ProductController.listProducts)
productRouter.put('/products/:id', authorization, ProductController.updateProduct)
productRouter.delete('/products/:id', authorization, ProductController.deleteProduct)

module.exports = productRouter