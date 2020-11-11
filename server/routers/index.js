const routes = require('express').Router()
const Product = require('./product')

routes.use('/product', Product)

module.exports = routes
