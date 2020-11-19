const router = require("express").Router()
const UserController = require("../controllers/user-controller")
const ProductController = require("../controllers/product-controller")
const BannerController = require("../controllers/banner-controller")
const CartController = require("../controllers/cart-controller")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/productCustomer", ProductController.getProductCustomer)
router.get("/bannerCustomer", BannerController.getBannerCustomer)



router.use(authentication)

router.get('/cart', CartController.getCart)
router.get('/cart/:id', CartController.getCartById)
router.post('/cart', CartController.postCart)
router.delete('/cart', CartController.deleteCart)
router.patch('/cart', CartController.patchCart)

router.get("/product",authorization, ProductController.getProduct)
router.get("/product/:id",authorization ,ProductController.getProductById)
router.post("/product",authorization ,ProductController.postProduct)
router.put("/product/:id",authorization ,ProductController.putProduct)
router.patch("/product/:id",authorization ,ProductController.patchProduct)
router.delete("/product/:id", authorization, ProductController.deleteProduct)

router.get("/category",authorization, ProductController.getCategory)
router.get("/category/:id",authorization ,ProductController.getCategoryById)

router.get("/banner",authorization ,BannerController.getBanner)
router.post("/banner",authorization, BannerController.postBanner)
router.put("/banner/:id",authorization ,BannerController.putBanner)
router.patch("/banner/:id",authorization ,BannerController.patchBanner)
router.delete("/banner/:id",authorization, BannerController.deleteBanner)



module.exports = router