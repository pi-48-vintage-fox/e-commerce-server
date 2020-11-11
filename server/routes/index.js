const router = require('express').Router()
const user = require('./user')
const product = require('./product')

router.use('/user', user)
router.use('/', product)

module.exports = router 