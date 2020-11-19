const router = require('express').Router()
const CartProductController = require('../controllers/CartProductController')
const authentication = require('../middlewares/authentication')
const { isCartOwner } = require('../middlewares/authorization')

router.get('/', authentication, isCartOwner, CartProductController.findAll)
router.get(
  '/:ProductId',
  authentication,
  isCartOwner,
  CartProductController.findByProduct
)

router.post('/', authentication, isCartOwner, CartProductController.add)
router.patch(
  '/',
  authentication,
  isCartOwner,
  CartProductController.updateQuantity
)
router.put('/', authentication, isCartOwner, CartProductController.update)
router.delete('/', authentication, isCartOwner, CartProductController.delete)

router.get(
  '/:ProductId/:CartId',
  authentication,
  isCartOwner,
  CartProductController.findByCartAndProduct
)

module.exports = router
