const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRouter = require('./product');
const categoryRouter = require('./category');
const checkoutRouter = require('./checkout');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/checkout', checkoutRouter);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;