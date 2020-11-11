const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.post('/', Authorization, BannerController.create)
router.get('/', Authorization, BannerController.getAll)
router.patch('/:id', Authorization, BannerController.changeActive)
router.delete('/:id', Authorization, BannerController.delete)

module.exports = router