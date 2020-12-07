const routes = require('express').Router()
const ProductController = require('../controllers/productController')

routes.get('/', ProductController.getProductPublic)

module.exports = routes