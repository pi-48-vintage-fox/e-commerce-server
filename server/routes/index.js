'use strict'
const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const authentication = require('../middlewares/authentication')

router.use(userRouter)
router.use(authentication)
router.use(productRouter)
router.use(cartRouter)

module.exports = router