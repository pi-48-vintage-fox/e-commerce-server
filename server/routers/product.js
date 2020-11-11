const routes = require('express').Router()
const ProductController = require('../controllers/productController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')


routes.use(Authentication.authentication)
routes.post('/', ProductController.postProduct)
routes.get('/', ProductController.getProduct)
routes.get('/:id', Authorization.authorization, ProductController.getProductById)
routes.put('/:id', Authorization.authorization, ProductController.putProduct)
routes.patch('/:id', Authorization.authorization, ProductController.patchProduct)
routes.delete('/:id', Authorization.authorization, ProductController.deleteProduct)

module.exports = routes

