const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/authorization')

router.get('/', ProductController.products)
router.get('/:ProductId', ProductController.findProductById)
router.post('/', authentication, isAdmin, ProductController.addProduct)
router.put('/:ProductId', authentication, isAdmin, ProductController.putProduct)
router.delete(
  '/:ProductId',
  authentication,
  isAdmin,
  ProductController.deleteProduct
)

module.exports = router
