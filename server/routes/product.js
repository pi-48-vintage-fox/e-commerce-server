const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = require('express').Router()

router.get('/', ProductController.fetch)
router.use(authentication)
router.post('/', authorization, ProductController.add)
router.get('/:id', authorization, ProductController.fetchById)
router.put('/:id', authorization, ProductController.edit)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router