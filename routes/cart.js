const router = require('express').Router()
const CartController = require('../controllers/cart_controllers')

router.get('/', CartController.viewCart)
router.post('/', CartController.addToCard)

module.exports = router