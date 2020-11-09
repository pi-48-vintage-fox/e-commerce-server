const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const productsRoutes = require('./product.js')

router.get('/', (req, res, next) => {
  res.status(200).json('hello')
})

router.post('/adminRegister', AdminController.register);

router.post('/adminLogin', AdminController.login);

router.use('/products', productsRoutes);

module.exports = router;