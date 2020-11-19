const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)

router.post('/', authorization, productController.createProduct)
router.get('/', productController.showProduct)
router.get('/:id', productController.showProductById)
router.delete('/:id', authorization, productController.deleteProduct)
router.put('/:id', authorization, productController.editProduct)


module.exports = router