const routes = require('express').Router()
const AdminController = require('../controllers/adminController')

routes.post('/register', AdminController.registerAdmin)

module.exports = routes