const router = require('express').Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization_admin')
const BannerControllers = require('../controllers/banner_controllers')

router.get('/', BannerControllers.viewAllBanner) 
router.use(authentication)
router.post('/', authorization, BannerControllers.addBanner)
router.put('/:id', authorization, BannerControllers.editBanner)
router.patch('/:id', authorization, BannerControllers.changeStatus)
router.delete('/:id', authorization, BannerControllers.deleteBanner)

module.exports = router