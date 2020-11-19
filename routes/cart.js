const router = require('express').Router();
const CartController = require('../controllers/cartController');
const authentication = require('../middlewares/authentication');
const {authorizationCart} = require('../middlewares/authorization')

router.use(authentication);
router.get('/', CartController.getCart);
router.post('/', CartController.addCart);
router.patch('/:id', CartController.patchCart);
router.get('/:id', CartController.findCartId);
router.delete('/:id', CartController.deleteCart);

module.exports = router;