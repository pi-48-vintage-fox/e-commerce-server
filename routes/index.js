const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')

const productCategoryRoutes = require('./productCategoryRoutes')
const productRoutes = require('./productRoutes')

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use('/categories', productCategoryRoutes)
router.use('/products', productRoutes)

router.use(errorHandler)

module.exports = router
