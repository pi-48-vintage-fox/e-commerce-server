const router = require('express').Router()
const productRouter = require('./productRouter')
// const bannerRouter = require('./bannerRouter')
const userController = require('../controllers/userControllers')

router.post('/login', userController.login)
router.use('/products', productRouter)

module.exports = router