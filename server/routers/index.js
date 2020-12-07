const routes = require('express').Router()
const Product = require('./product')
const ProductPublic = require('./productPublic')
const Cart = require('./cart')
const User = require('./user')

routes.use('/', User)
routes.use('/cart', Cart)
routes.use('/product', Product)
routes.use('/productPublic', ProductPublic)

module.exports = routes
