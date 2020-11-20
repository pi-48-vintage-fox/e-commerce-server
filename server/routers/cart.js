const routes = require('express').Router()
const CartController = require('../controllers/cartController')
const Auth = require('../middlewares/auth')

routes.use(Auth.authenticationUser)
routes.post('/:productId', CartController.postCart)
routes.get('/', CartController.getCart)
routes.put('/:id', CartController.putCart)
routes.delete('/:id', CartController.deleteCart)

module.exports = routes
