const router = require('express').Router()
const controller = require('../controllers/productController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', controller.addProduct)
router.get('/', controller.readProduct)
router.get('/:id', controller.readById)
router.put('/:id',authorization, controller.editProduct)
router.delete('/:id',authorization, controller.delete)
