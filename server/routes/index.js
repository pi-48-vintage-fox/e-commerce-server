const router =  require('express').Router()

const userRouter = require('./userRouters')
const productRouter = require('./productRouters')

router.use(userRouter)
router.use(productRouter)

module.exports = router