const router = require('express').Router();
const ProductController = require('../controllers/productController');
const Authenticate = require('../middlewares/authenticate');
const Authorize = require('../middlewares/authorize');

router.get('/', ProductController.getProducts);
router.use(Authenticate.user);
router.post('/', Authorize.admin, ProductController.addProduct);
router.put('/:id', Authorize.admin, ProductController.editProduct);

module.exports = router;