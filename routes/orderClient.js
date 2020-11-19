const router = require("express").Router();
const Controller = require("../controllers/OrderController");

router.get("/", Controller.getAllOrders)
router.post("/", Controller.addOrder)
router.put("/:id", Controller.editOrder)
router.patch("/:id", Controller.updateStatusOrder)
router.delete("/:id", Controller.deleteOrder)

module.exports = router