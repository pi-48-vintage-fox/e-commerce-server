const  { Product, Category } = require("../models/index")

class ProductController {

    static getProduct(req, res, next) {
        Product.findAll({
            include: [Category]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static getProductById(req, res, next) {
        let newId = req.params.id
        Product.findOne({
            where: {
                id: newId
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static postProduct(req, res, next) {
        let dataProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            CategoryId: +req.body.CategoryId
        }
        Product.create(dataProduct, {
            returning: true
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static putProduct(req, res, next) {
        let productId = +req.params.id
        let dataProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            CategoryId: +req.body.CategoryId
        }
        Product.update(dataProduct, {
            where: {
                id: productId
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static patchProduct(req, res, next) {

    }

    static deleteProduct(req, res, next) {
        let productId = +req.params.id
        Product.destroy({
            where: {
                id: productId 
            }
        })
        .then(() => {
            res.status(200).json({message: "Item deleted successfuly"})
        })
        .catch(err => {
            next(err)
        })
    }

    static getCategory(req, res, next) {
        Category.findAll({
            include: [Product]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static getCategoryById(req, res, next) {
        let idParams = req.params.id
        Category.findAll({
            where: {
                id: idParams
            },
            include: [Product]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController