const routes = require('express').Router()
const UserController = require('../controllers/userController')

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

module.exports = routes
