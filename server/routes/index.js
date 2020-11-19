const router = require('express').Router()
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const userController = require('../controllers/userControllers')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router