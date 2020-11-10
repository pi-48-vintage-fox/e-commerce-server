'use strict'
const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const authentication = require('../middlewares/authentication')

router.use(userRouter)
router.use(authentication)
router.use(productRouter)

module.exports = router