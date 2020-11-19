const router = require("express").Router();
const Controller = require("../controllers/ProductController");
const {authentication, authorization, authorizationClient} = require('../middlewares/auth');


router.get("/", Controller.getAllProducts)
router.post("/", authentication, authorizationClient, Controller.addProduct)
router.put("/:id", authentication, authorizationClient,Controller.editProduct)
router.delete("/:id", authentication, authorizationClient,Controller.deleteProduct)

module.exports = router;
