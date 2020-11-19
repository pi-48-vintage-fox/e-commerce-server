const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authenticationCustomer = require('../middlewares/authenticationCustomer')

router.post('/login', Controller.login)
router.post('/register', Controller.register)

//admin
router.get('/products', authentication, Controller.show)
router.post('/products', authentication, Controller.create)
router.put('/products/:id', authentication, Controller.update)
router.delete('/products/:id', authentication, Controller.delete)

//customer
router.get('/custProducts', Controller.show)
router.get('/carts', authenticationCustomer, Controller.showCart)
router.post('/carts/:id', authenticationCustomer, Controller.addCart)
router.patch('/carts/increment/:id', authenticationCustomer, Controller.updatePlusCart)
router.patch('/carts/decrement/:id', authenticationCustomer, Controller.updateMinusCart)
router.delete('/carts/:id', authenticationCustomer, Controller.deleteCart)
router.post('/checkout', authenticationCustomer, Controller.checkout)

//transaction
router.get('/transactions', authenticationCustomer, Controller.showTransactions)

module.exports = router