const router = require('express').Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getProduct);
router.post('/', ProductController.addProduct);
router.get('/:id', ProductController.getProductById);
router.patch('/:id', ProductController.patchProduct); 

module.exports = router;