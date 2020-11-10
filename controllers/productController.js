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
}

module.exports = ProductController