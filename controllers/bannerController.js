const {Banner} = require('../models/index');

class BannerController {
  static async getBanner(req, res, next){
    try {
      const getBanner = await Banner.findAll();
      res.status(200).json(getBanner);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async addBanner(req, res, next){
    const newBanner = {
      name: req.body.name,
      image_url: req.body.image_url,
      isActive: true
    };

    try {
      const insertBanner = await Banner.create(newBanner);
      res.status(201).json(insertBanner);
    } catch (error) {
      next(error);
    }
  }

  static async changeActive(req, res, next){
    try {
      const change = await Banner.update({
        isActive: req.body.isActive
      },
      {
        where: {
          id: +req.params.id
        }
      });
      if (change) {
        res.status(201).json({
          message: 'Success'
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBanner(req, res, next){
    try {
      const deleteBanner = Banner.destroy({
        where: {
          id: +req.params.id
        }
      })
      if (deleteBanner) {
        res.status(200).json({
          message: 'Success delete banner'
        })
      } 
    } catch (error) {
      res.status(500),json(error)
    }
  }
}

module.exports = BannerController