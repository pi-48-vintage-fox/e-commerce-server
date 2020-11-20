const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const CartController = require('../controllers/CartController')
const Auth = require('../middlewares/Auth')

router.get('/products',ProductController.list)
router.use(Auth.authCustomer)
router.get('/cart', Auth.authorization, CartController.show)
router.post('/addcart', Auth.authorization, CartController.add)
router.get('/checkout',Auth.authorization, CartController.history)
router.put('/checkout',Auth.authorization, CartController.checkout)
router.patch('/cart/:id', Auth.authorization, CartController.update)
router.delete('/cart/:id',Auth.authorization, CartController.delete)

module.exports = router