const router = require('express').Router()
const CartController = require('../controllers/cart_controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization_customer')

router.use(authentication)
router.get('/', authorization, CartController.viewCart)
router.post('/', authorization, CartController.addToCard)
router.patch('/:id', authorization, CartController.updateCart)
router.delete('/:id', authorization, CartController.deleteFromCart)
router.post('/checkout', authorization, CartController.checkOut)

module.exports = router