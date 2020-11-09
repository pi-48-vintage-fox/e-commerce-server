const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.post('/', BannerController.create)
router.get('/', Authorization, BannerController.create)
router.put('/:id', Authorization, BannerController.changeActive)
router.delete('/:id', Authorization, BannerController.delete)

module.exports = router