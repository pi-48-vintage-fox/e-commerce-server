const router = require('express').Router()
const productController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/products', authorization, productController.addProduct)
router.get('/products', authorization, productController.showProduct)
router.get('/products/:id', authorization, productController.showProductById)
router.put('/products/:id', authorization, productController.updateProduct)
router.delete('/products/:id', authorization, productController.deleteProduct)


module.exports = router