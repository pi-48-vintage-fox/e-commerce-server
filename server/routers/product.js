const routes = require('express').Router()
const ProductController = require('../controllers/productController')
const Auth = require('../middlewares/auth')

routes.use(Auth.authentication)
routes.post('/', ProductController.postProduct)
routes.get('/', ProductController.getProduct)
routes.put('/:id', Auth.authorization, ProductController.putProduct)
routes.delete('/:id', Auth.authorization, ProductController.deleteProduct)

module.exports = routes

