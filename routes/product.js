const router = require("express").Router();
const Controller = require("../controllers/ProductController");

router.get("/", Controller.getAllProducts)
router.post("/", Controller.addProduct)
router.put("/:id", Controller.editProduct)
router.delete("/:id", Controller.deleteProduct)

module.exports = router;
