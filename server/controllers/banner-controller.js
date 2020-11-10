const { Banner } = require("../models/index")

class BannerController {
    static getBanner(req, res, next) {
        Banner.findAll({
            include: [Category]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static postBanner(req, res, next) {
        let dataBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url,
        }
        Banner.create(dataBanner, {
            returning: true
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static putBanner(req, res, next) {
        let bannerId= +req.params.id
        let dataBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url,
        }
        Banner.update(dataBanner, {
            where: {
                id: bannerId
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static patchBanner(req, res, next) {}

    static deleteBanner(req, res, next) {
        let bannerId = +req.params.id
        Banner.destroy({
            where: {
                id: bannerId 
            }
        })
        .then(() => {
            res.status(200).json({message: "Banner deleted successfuly"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = BannerController