const router = require("express").Router();
const Controller = require("../controllers/Controller");
const productRouter = require('./product');
const productClientRouter = require('./productClient');
const orderRouter = require('./order');
const orderClientRouter = require('./orderClient');
const {authentication, authorization, authorizationClient} = require('../middlewares/auth');


router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/loginClient", Controller.loginClient);
router.post("/googleLogin", Controller.googleLogin);

router.use("/products", authentication, authorization, productRouter)
router.use("/orders", authentication, authorization, orderRouter)

router.use("/productsClient", productClientRouter)
router.use("/ordersClient", authentication, authorizationClient, orderClientRouter)

module.exports = router;
