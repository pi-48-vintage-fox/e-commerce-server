const router =  require('express').Router()

const userRouter = require('./userRouters')
const productRouter = require('./productRouters')

router.get('/', (req, res )=> {
  res.send('hello World')
})
router.use(userRouter)
router.use(productRouter)

module.exports = router