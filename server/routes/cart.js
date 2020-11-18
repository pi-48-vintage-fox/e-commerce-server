const CartController = require('../controllers/cartController')
const { customerAuth } = require('../middlewares/authorization')
const router = require('express').Router()
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', CartController.addToCart)
router.get('/', customerAuth, CartController.showCart)
router.patch('/:id', customerAuth, CartController.changeQuantity)
router.delete('/:id', customerAuth, CartController.deleteCart)

module.exports = router