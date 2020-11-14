const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')
const banner = require('./banner')

router.use('/admin', admin)
router.use('/products', product)
router.use('/banners', banner)

module.exports = router