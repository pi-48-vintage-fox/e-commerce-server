const { Product } = require('../models/index')

class ProductController {
    static async addProduct(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            UserId: req.userData.id
        }
        try {
            const data = await Product.create(newProduct)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async listProducts(req, res, next) {
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }

    }
    static async updateProduct(req, res, next) {
        const idProduct = req.params.id
        const editProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        try {
            const data = await Product.update(editProduct, {
                where: {
                    id: idProduct
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async deleteProduct(req, res, next) {
        const idProduct = req.params.id
        try {
            const data = await Product.destroy({
                where:
                    { id: +idProduct }
            })
            if (data === 1) {
                res.status(200).json({ msg: 'Product has been deleted.' })
            }
            else {
                res.status(404).json({ msg: 'Product Not Found' })
            }
        } catch (err) {
            next(err)
        }

    }
}
module.exports = ProductController