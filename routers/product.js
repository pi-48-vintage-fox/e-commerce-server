const router = require('express').Router()
const ProductController = require('../controllers/productController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.read)
router.put('/:id', Authorization, ProductController.update)
router.delete('/:id', Authorization, ProductController.delete)

module.exports = router