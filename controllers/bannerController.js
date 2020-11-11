const { Banner } = require("../models");

class BannersController {
    static getAll(req, res, next) {
        Banner.findAll()
            .then((results) => {
                if (results) {
                    results = results.map((el) => {
                        return {
                            id: el.id,
                            name: el.name,
                            image_url: el.image_url,
                            is_active: el.is_active,
                        };
                    });
                }
                res.status(200).json(results);
            })
            .catch((err) => {
                next(err);
            });
    }

    static create(req, res, next) {
        const bannerData = {
            name: req.body.name,
            image_url: req.body.image_url,
            is_active: req.body.is_active || false,
        };

        Banner.create(bannerData)
            .then((result) => {
                if (result) {
                    const { id, name, is_active, image_url } = result;
                    res.status(201).json({
                        id,
                        name,
                        is_active,
                        image_url,
                    });
                } else {
                    next({ name: "BadRequest", message: "Create Banner failed" });
                }
            })
            .catch((err) => {
                next(err);
            });
    }

    static changeActive(req, res, next) {
        const bannerData = {
            is_active: req.body.is_active,
        };

        Banner.update(bannerData, { where: { id: req.params.id } })
            .then((result) => {
                if (result) {
                    return Banner.findOne({ where: { id: req.params.id } });
                } else {
                    next({ name: "BadRequest", message: "Update Banner active status failed" });
                }
            })
            .then(({ id, name, is_active, image_url }) => {
                res.status(200).json({
                    id,
                    name,
                    is_active,
                    image_url,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static delete(req, res, next) {
        Banner.destroy({ where: { id: req.params.id } })
            .then((result) => {
                if (result) {
                    res.status(200).json({ message: "Delete Banner successful" });
                } else {
                    next({ name: "BadRequest", message: "Delete Banner failed" });
                }
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = BannersController;