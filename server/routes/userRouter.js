'use strict'
const userRouter = require('express').Router()
const UserController = require('../controllers/userController')

userRouter.post('/register', UserController.register)
userRouter.use('/login', UserController.login)

module.exports = userRouter