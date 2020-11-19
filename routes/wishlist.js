const router = require("express").Router();
const Controller = require("../controllers/WishlistController");
const {authentication, authorization, authorizationClient} = require('../middlewares/auth');


router.get("/", authentication, Controller.getAllWishlist)
router.post("/", authentication, authorizationClient, Controller.addWishlist)
// router.put("/:id", authentication, authorizationClient,Controller.editProduct)
// router.delete("/:id", authentication, authorizationClient,Controller.deleteProduct)

module.exports = router;
