const router = require("express").Router();
const Controller = require("../controllers/Controller");
const productRouter = require('./product');
const orderRouter = require('./order');
const {authentication, authorization} = require('../middlewares/auth');


router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/googleLogin", Controller.googleLogin);

router.use("/products", authentication, productRouter)
router.use("/orders", authentication, orderRouter)

module.exports = router;
