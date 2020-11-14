"use strict";
const { Banner } = require("../models");
class BannerController {
  static async index(req, res, next) {
    try {
      let banners = await Banner.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        msg: "Banners Fetched",
        banners,
      });
    } catch (error) {
      next(error);
    }
  }
  static async insert(req, res, next) {
    try {
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        is_active: req.body.is_active,
      };
      let banner = await Banner.create(data);
      res.status(200).json({
        msg: "Banner Created",
        banner,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      let id = req.params.id;
      let banner = await Banner.findByPk(id);
      res.status(200).json({
        msg: "Banner deleted",
        banner,
      });
      banner.destroy();
      banner.save();
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      let id = req.params.id;
      let data = {
        name: req.body.name,
        image_url: req.body.image_url,
        is_active: req.body.is_active,
      };
      console.log(data);
      let banner = await Banner.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json({
        msg: 'Banner Updated',
        banner : banner[0][1]
      })
    } catch (error) {
      next (error)
    }
  }
}

module.exports = BannerController;
