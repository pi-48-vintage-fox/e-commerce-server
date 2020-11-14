const {Product, Category} = require('../models/index');

class ProductController {
    static async getProduct(req, res, next){
        try {
            const getAllProduct = await Product.findAll({
                include: Category
            });
            res.status(200).json(getAllProduct);
        } catch (error) {
            next(error)
        }
    }
    
    static async addProduct(req, res, next){
        try {
            const newProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                CategoryId: req.body.CategoryId
            }

            const addProduct = await Product.create(newProduct);
            res.status(201).json(addProduct);
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next){
        try {
            const getProduct = await Product.findByPk(+req.params.id, {
                include: Category
            });
            if (getProduct) {
                res.status(200).json(getProduct)
            } else {
                res.status(401).json({
                    message: "Product not found"
                })
            }
        } catch (error) {
            next(error);
        }
    }

    static async editPut(req, res, next){
        const editProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId
        }

        try {
            const update = await Product.update(editProduct, {
                where: {
                    id: +req.params.id
                }
            })

            res.status(201).json(update);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static patchProduct(req, res, next){
        Product.findByPk(+req.params.id)
        .then(find => {
            return find.update({
                stock: find.stock - req.body.stock
            })
        })
        .then(result => {
            if (result) {
                res.status(201).json(result)
            } else {
                res.status(400).json({
                    message: 'Stock habis'
                })
            }
        })
        .catch(err => {
            console.log(err.errors[0].message);
            next(err.errors[0].message);
        })
    }

    static async deleteProduct(req, res, next){
        try {
            const deleteProduct = await Product.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if (deleteProduct) {
                res.status(201).json({
                    message: 'Success delete product'
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ProductController