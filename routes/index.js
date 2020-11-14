const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')

const authentication = require('../middlewares/authentication')
const {isAdmin} = require('../middlewares/authorization')

const productCategoryRoutes = require('./productCategoryRoutes')
const productRoutes = require('./productRoutes')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/user', authentication, isAdmin, UserController.getUserDetails)

router.use('/categories', productCategoryRoutes)
router.use('/products', productRoutes)

router.use(errorHandler)

module.exports = router
