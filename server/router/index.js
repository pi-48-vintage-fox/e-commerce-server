const router = require("express").Router()
const UserController = require("../controllers/user-controller")
const ProductController = require("../controllers/product-controller")
const BannerController = require("../controllers/banner-controller")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use(authentication)
router.use(authorization)
router.get("/product", ProductController.getProduct)
router.post("/product", ProductController.postProduct)
router.put("/product/:id", ProductController.putProduct)
router.patch("/product/:id", ProductController.patchProduct)
router.delete("/product/:id", ProductController.deleteProduct)

router.get("/banner", BannerController.getBanner)
router.post("/banner", BannerController.postBanner)
router.put("/banner/:id", BannerController.putBanner)
router.patch("/banner/:id", BannerController.patchBanner)
router.delete("/banner/:id", BannerController.deleteBanner)



module.exports = router