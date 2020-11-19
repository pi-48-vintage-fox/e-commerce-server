const router =  require('express').Router()
const productController = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')
const userRouter = require('./userRouters')
const productRouter = require('./productRouters')
const cartRouter = require('./cartRouters')

router.get('/', (req, res )=> {
  res.send('hello World')
})
router.use(userRouter)
router.get('/customers', productController.showProduct)
router.use(authentication)
router.use('/customers', cartRouter)
router.use(productRouter)

module.exports = router