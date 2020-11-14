const router = require('express').Router()
const productRouter = require('./productRouter')
// const bannerRouter = require('./bannerRouter')
const userController = require('../controllers/userControllers')
// const authentication = require('../middleware/authentication')

router.post('/login', userController.login)
// router.use(authentication)
router.use('/products', productRouter)
// router.use(bannerRouter)

module.exports = router