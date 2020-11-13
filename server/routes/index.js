const router = require("express").Router()
const UserController = require('../controllers/userController')
const {authentication, authorization} = require('../middlewares/auth')
const ProductController = require('../controllers/productController')


router.post('/login', UserController.login)
router.use(authentication)
router.post('/products', authorization, ProductController.createProduct)
router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.getEditProduct)
router.put('/products/:id', authorization, ProductController.updateProduct)
router.delete('/products/:id',authorization, ProductController.deleteProduct)

module.exports = router   