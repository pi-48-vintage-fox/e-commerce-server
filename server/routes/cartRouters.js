const router = require('express').Router()
const cartController = require('../controllers/CartController')
const { authorizationCustomer }= require('../middlewares/auth')

router.post('/cart', cartController.addCart)
router.get('/cart', authorizationCustomer, cartController.showCartByUserId)
router.delete('/cart/:id', authorizationCustomer, cartController.deleteCart)
router.patch('/cart/:id', authorizationCustomer, cartController.updateQuantity)
router.patch('/cart', authorizationCustomer, cartController.checkOut)
module.exports = router