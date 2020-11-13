const {Product, Category} = require('../models/index');

class ProductController {
    static async getProduct(req, res){
        try {
            const getAllProduct = await Product.findAll({
                include: Category
            });
            res.status(200).json(getAllProduct);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    static async addProduct(req, res){
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
            res.status(500).json(error);
        }
    }

    static async getProductById(req, res){
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
            res.status(500).json(error);
        }
    }

    static async editPut(req, res){
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

            res.status(201).josn(update);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static patchProduct(req, res){
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
            res.status(500).json(err.errors[0].message);
        })
    }

    static async deleteProduct(req, res){
        
    }
}

module.exports = ProductController