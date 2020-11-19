'use strict'
const express = require('express');
const BannerController = require('../controllers/BannerController');
const { authentication } = require('../middlewares/AuthMiddleware');
const bannerRoute = express.Router()

bannerRoute.get('/banners',BannerController.index)
bannerRoute.post('/banners',authentication, BannerController.insert)
bannerRoute.put('/banners/:id', authentication, BannerController.update)
bannerRoute.delete('/banners/:id', authentication, BannerController.delete)
module.exports = bannerRoute