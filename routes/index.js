const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const {authentication} = require('../middlewares/auth')

routes.use('/users',userRoutes)
routes.use(authentication)
routes.use('/products', productRoutes)


module.exports = routes