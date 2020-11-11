const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.use(authentication)
router.post('/', ProductController.add)
router.get('/', ProductController.fetch)
router.put('/:id', ProductController.edit)

module.exports = router