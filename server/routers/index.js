const routes = require('express').Router()
const Product = require('./product')
const User = require('./user')

routes.use('/', User)
routes.use('/product', Product)

module.exports = routes
