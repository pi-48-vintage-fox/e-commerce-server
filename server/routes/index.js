const router = require('express').Router()
const user = require('./user')
const product = require('./product')

router.use('/', user)
router.use('/product', product)

module.exports = router 