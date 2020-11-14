const { Banner } = require('../models/index')

class BannerControllers {
    static viewAllBanner (req, res, next) {
        Banner.findAll() 
        .then(banners => {
            res.status(200).json(banners)
        })
        .catch(err => {
            next(err)
        })
    }

    static addBanner (req, res, next) {
        const payload = {
            title: req.body.title,
            image_url: req.body.image_url,
            status: 'inactive'
        }
        Banner.create(payload)
        .then(banner => {
            res.status(201).json(banner)
        })
        .catch(err => {
            next(err)
        })
    }

    static editBanner (req, res, next) {
        const id = +req.params.id
        const payload = {
            title: req.body.title,
            image_url: req.body.image_url,
            status: req.body.status
        }
        Banner.update(payload, {
            where: {
                id: id
            }
        })
        .then(banner => {
            if(banner == 0){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(banner){
                res.status(200).json({msg: 'Sucessfully update banner'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static changeStatus (req, res, next) {
        const id = +req.params.id
        let status 
        Banner.findByPk(id)
        .then(selectedBanner => {
            if(selectedBanner.status === 'inactive'){
                status = 'active'
            }
            else {
                status = 'inactive'
            }
            return Banner.update({status}, {
                where: {
                    id: id
                }
            })
        })
        .then(banner => {
            if(banner == 0){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(banner){
                res.status(200).json({msg: 'Sucessfully change status'})
            }
        })
        .catch(err => {
            next(err)
        }) 
    }

    static deleteBanner (req, res, next) {
        const id = +req.params.id
        Banner.destroy({
            where: {
                id: id
            }
        })
        .then(banner => {
            if(banner == 0){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(banner){
                res.status(200).json({msg: 'Sucessfully delete banner'})
            }
        })
        .catch(err => {
            next(err)
        }) 
    }

}

module.exports = BannerControllers