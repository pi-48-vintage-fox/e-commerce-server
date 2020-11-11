const router = require('express').Router()
const controller = require('../controllers/productController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.get('/', controller.readProduct)
router.post('/', controller.addProduct)
router.put('/:id',authorization, controller.editProduct)
router.delete('/:id',authorization, controller.delete)

module.exports = router