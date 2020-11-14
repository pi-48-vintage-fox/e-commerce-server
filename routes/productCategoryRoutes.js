const router = require('express').Router()
const ProductCategoryController = require('../controllers/ProductCategoryController')
const authentication = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/authorization')

router.get('/', authentication, ProductCategoryController.categories)
router.get('/:CategoryId', authentication, ProductCategoryController.findById)
router.post('/', authentication, isAdmin, ProductCategoryController.addCategory)
router.put(
  '/:CategoryId',
  authentication,
  isAdmin,
  ProductCategoryController.putCategory
)
router.delete(
  '/:CategoryId',
  authentication,
  isAdmin,
  ProductCategoryController.deleteCategory
)

module.exports = router
