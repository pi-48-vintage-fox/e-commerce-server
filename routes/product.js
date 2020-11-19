const router = require('express').Router()
const ProductControllers = require('../controllers/product_controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization_admin')

router.get('/', ProductControllers.viewProducts)
router.use(authentication)
router.post('/', authorization, ProductControllers.addProducts)
router.put('/:id', authorization, ProductControllers.editProducts)
router.delete('/:id', authorization, ProductControllers.deleteProducts)

module.exports = router