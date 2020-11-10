const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const bannerRouter = require('./bannerRouter')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.use(userRouter)
router.use(productRouter)
router.use(bannerRouter)

module.exports = router