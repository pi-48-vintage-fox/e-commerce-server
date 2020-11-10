const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRouter = require('./product');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/product', productRouter);

module.exports = router;