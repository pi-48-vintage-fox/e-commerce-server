'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const CartController = require('../controllers/CartController')
const { authentication, authorization, authenticationCustomer } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', authentication, ProductController.show)
router.get('/products/:id', authentication, ProductController.findOne)
router.post('/products', authentication, authorization, ProductController.add)
router.put('/products/:id', authentication, authorization, ProductController.edit)
router.delete('/products/:id', authentication, authorization, ProductController.delete)


router.get('/productCustomers', authenticationCustomer, ProductController.show)
router.get('/carts', authenticationCustomer, CartController.showCart)
router.post('/carts/:id', authenticationCustomer, CartController.addCart)
router.patch('/cartsTambah/:id', authenticationCustomer, CartController.updateTambahCart)
router.patch('/cartsKurang/:id', authenticationCustomer, CartController.updateKurangCart)
router.delete('/carts/:id', authenticationCustomer, CartController.deleteCart)
router.post('/checkout', authenticationCustomer, CartController.checkOut)


module.exports = router