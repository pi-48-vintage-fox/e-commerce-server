const router = require('express').Router()
const userRoutes = require("./userRoutes")
const productRoutes = require("./productRoutes")
const custRoutes = require("./custRoutes")
const errHandler = require("../middlewares/errorHandler")

router.use(userRoutes)
router.use('/products',productRoutes)
router.use('/cust',custRoutes)
router.use(errHandler)

module.exports = router