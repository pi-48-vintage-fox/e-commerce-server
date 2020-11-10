const router = require('express').Router()
const userRoutes = require("./userRoutes")
const productRoutes = require("./productRoutes")
const errHandler = require("../middlewares/errorHandler")

router.use(userRoutes)
router.use('/products',productRoutes)
router.use(errHandler)

module.exports = router