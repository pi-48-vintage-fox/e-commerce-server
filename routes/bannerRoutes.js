const router = require('express').Router()
const BannerController = require('../controllers/BannerController')
const authentication = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/authorization')

router.get('/', authentication, BannerController.banners)
router.get('/:BannerId', authentication, BannerController.findBannerById)
router.post('/', authentication, isAdmin, BannerController.addBanner)
router.put('/:BannerId', authentication, isAdmin, BannerController.putBanner)
router.delete(
  '/:BannerId', 
  authentication,
  isAdmin,
  BannerController.deleteBanner
)

module.exports = router
