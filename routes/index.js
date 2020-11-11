const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRouter = require('./product');
const categoryRouter = require('./category');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

module.exports = router;