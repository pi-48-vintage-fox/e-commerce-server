const router = require('express').Router()
const controller = require('../controllers/CartController')
const controllerr = require('../controllers/productController')
const AuthenticateCust = require('../middlewares/authenticationCust')

router.get('/product', controllerr.readProduct)
router.use(AuthenticateCust)
router.get('/', controller.readCart)
router.post('/:id', controller.addCart)
router.patch('/:id', controller.editCart)
router.delete('/:id', controller.delete)

module.exports = router