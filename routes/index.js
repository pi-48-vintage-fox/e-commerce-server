const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRouter = require('./product');
const categoryRouter = require('./category');
const bannerRouter = require('./banner');
const cartRouter = require('./cart');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/products', productRouter);
router.use('/banner', bannerRouter);
router.use('/categories', categoryRouter);
router.use('/cart', cartRouter)
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;