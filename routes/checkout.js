const router = require('express').Router();
const CheckoutController = require('../controllers/checkoutController');
const authentication = require('../middlewares/authentication');

router.post('/',authentication, CheckoutController.addCheckout);

module.exports = router