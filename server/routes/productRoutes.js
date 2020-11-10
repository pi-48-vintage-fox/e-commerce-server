const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Auth = require("../middlewares/Auth")

router.use(Auth.authentication)
router.post('/',ProductController.add)
router.put('/:id',ProductController.edit)
router.delete('/:id',ProductController.delete)

module.exports = router