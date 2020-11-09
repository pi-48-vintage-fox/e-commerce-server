const routes = require('express').Router()
const Admin = require('./admin')

routes.use('/admin', Admin)

module.exports = routes