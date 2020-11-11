const routes = require ('express').Router()
const productController = require('../controllers/productController')
const {authorization,authentication} = require('../middlewares/auth')

routes.get('/', productController.getAll)
routes.use(authentication)
routes.post('/addproduct', productController.createProduct)
routes.put('/:id',authorization, productController.editProduct)
routes.delete('/:id', authorization, productController.deleteProduct)
module.exports = routes