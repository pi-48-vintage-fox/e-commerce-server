const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')

const authentication = require('../middlewares/authentication')
const { isAdmin, isNotAdmin } = require('../middlewares/authorization')

const productCategoryRoutes = require('./productCategoryRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const cartRoutes = require('./cartRoutes')
const cartProductRoutes = require('./cartProductRoutes')

router.post('/adminlogin', isAdmin, UserController.adminlogin)
router.post('/login', isNotAdmin, UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.post('/register', UserController.register)
router.get('/users/:UserId', authentication, UserController.getUserDetails)

router.use('/categories', productCategoryRoutes)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/carts', cartRoutes)
router.use('/carts/:CartId/items', cartProductRoutes)

router.use(errorHandler)

module.exports = router
