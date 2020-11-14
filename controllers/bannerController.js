const {Banner} = require('../models');

class BannerController {
  static async getBanner(req, res){
    try {
      const getBanner = await Banner.findAll();
      res.status(200).json(getBanner);
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async addBanner(req, res){
    const newBanner = {
      name: req.body.name,
      image_url: req.body.image_url,
      isActive: true
    };

    try {
      const insertBanner = await Banner.create(newBanner);
      res.status(201).json(insertBanner);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async changeActive(req, res){
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
      res.status(500).json(error);
    }
  }

  static async deleteBanner(req, res){
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