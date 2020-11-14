const router = require('express').Router();
const BannerController = require('../controllers/bannerController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', BannerController.getBanner);
router.post('/', authentication, authorization, BannerController.addBanner);
router.patch('/:id', authentication, authorization, BannerController.changeActive);
router.delete('/:id', authentication, authorization, BannerController.deleteBanner);

module.exports = router