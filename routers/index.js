const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const banner = require('./banner')

router.use('/', user)
router.use('/products', product)
router.use('/banners', banner)

module.exports = router