const router = require('express').Router();
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const {authorization} = require('../middlewares/authorization');

router.get('/', ProductController.getProduct);
router.post('/',authentication, authorization, ProductController.addProduct);
router.get('/:id', ProductController.getProductById);
router.patch('/:id',authentication, ProductController.patchProduct); 
router.put('/:id', authentication, authorization, ProductController.editPut);
router.delete('/:id', authentication, authorization, ProductController.deleteProduct);

module.exports = router;