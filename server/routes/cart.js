const CartController = require('../controllers/cartController')
const router = require('express').Router()

router.get('/', CartController.showCart)
router.post('/', CartController.addToCart)
router.patch('/:id', CartController.changeStatus)
router.delete('/:id', CartController.deleteCart)

module.exports = router