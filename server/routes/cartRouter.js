const router = require('express').Router()
const authentication = require('../middleware/authentication')
const cartController = require('../controllers/cartController')

router.use(authentication)
router.get('/', cartController.showAllCart)
router.post('/', cartController.createCart)
router.patch('/:id', cartController.updateCart)
router.delete('/:id', cartController.deleteCart)
router.get('/:id', cartController.showCartById)

module.exports = router