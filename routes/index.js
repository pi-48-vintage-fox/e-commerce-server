'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')

router.post('/login', UserController.login)

router.get('/products', authentication, ProductController.show)
router.get('/products/:id', authentication, ProductController.findOne)
router.post('/products', authentication, authorization, ProductController.add)
router.put('/products/:id', authentication, authorization, ProductController.edit)
router.delete('/products/:id', authentication, authorization, ProductController.delete)


module.exports = router