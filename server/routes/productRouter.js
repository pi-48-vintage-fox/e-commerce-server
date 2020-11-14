const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middleware/authentication')

router.use(authentication)

router.post('/', productController.createProduct)
router.get('/', productController.showProduct)
router.get('/:id', productController.showProductById)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.editProduct)


module.exports = router