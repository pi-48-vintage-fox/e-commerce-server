const router = require("express").Router();
const Controller = require("../controllers/OrderController");

router.get("/", Controller.getAllOrders)
router.patch("/", Controller.updateStatusOrder)

module.exports = router