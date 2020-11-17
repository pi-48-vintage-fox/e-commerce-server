const router = require('express').Router()
const CartController = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')
const { isNotAdmin, isCartOwner } = require('../middlewares/authorization')

router.get('/', authentication, isCartOwner, CartController.findAll)
router.get('/:CartId', authentication, isCartOwner, CartController.findById)
router.post('/', authentication, isNotAdmin, CartController.add)
router.patch(
  '/:CartId',
  authentication,
  isCartOwner,
  CartController.updateStatus
)
router.delete('/:CartId', authentication, isCartOwner, CartController.delete)

module.exports = router
