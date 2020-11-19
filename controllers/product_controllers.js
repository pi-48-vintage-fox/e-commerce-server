const {Product} = require('../models/index')

class ProductControllers {

    static viewProducts (req, res, next) {
        Product.findAll() 
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static addProducts (req, res, next) {
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(payload)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static editProducts (req, res, next) {
        const id = +req.params.id
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(payload, {
            where: {
                id: id
            }
        })
        .then(product => {
            if(product == 0){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(product){
                res.status(200).json({msg: 'Sucessfully update product'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static deleteProducts (req, res, next) {
        const id = +req.params.id
        Product.destroy({
            where: {
                id: id
            }
        })
        .then(product => {
            if(product == 0) {
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(product){
                res.status(200).json({msg: 'Sucessfully delete product'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductControllers