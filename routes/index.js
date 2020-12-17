const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')

const authentication = require('../middlewares/authentication')

const productCategoryRoutes = require('./productCategoryRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const cartRoutes = require('./cartRoutes')
const cartProductRoutes = require('./cartProductRoutes')

router.post('/adminlogin', UserController.adminlogin)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.post('/register', UserController.register)
router.post('/checkemail', UserController.checkemail)
router.get('/user', authentication, UserController.getUserDetails)

router.use('/categories', productCategoryRoutes)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/carts', cartRoutes)
router.use('/cartitems', cartProductRoutes)

router.use(errorHandler)

module.exports = router
