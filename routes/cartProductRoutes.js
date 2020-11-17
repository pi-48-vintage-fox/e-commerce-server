const router = require('express').Router()
const CartProductController = require('../controllers/CartProductController')
const authentication = require('../middlewares/authentication')
const { isCartOwner } = require('../middlewares/authorization')

router.get('/', authentication, isCartOwner, CartProductController.findAll)
router.get(
  '/:CartId',
  authentication,
  isCartOwner,
  CartProductController.findById
)
router.post('/', authentication, isCartOwner, CartProductController.add)
router.patch(
  '/:CartId',
  authentication,
  isCartOwner,
  CartProductController.updateQuantity
)
router.delete(
  '/:CartId',
  authentication,
  isCartOwner,
  CartProductController.delete
)

module.exports = router
