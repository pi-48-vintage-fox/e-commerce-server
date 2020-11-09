const { Product, Category } = require('../models')

class ProductController {
    static create(req, res, next) {
		const productData = {
			name: req.body.name,
			image_url: req.body.image_url,
			price: req.body.price,
			stock: req.body.stock,
			CategoryId: req.body.CategoryId,
		};

		Product.create(productData)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

    static read(req, res, next) {
        Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
            },
        })
            .then((results) => {
                results = results.map((el) => {
                    const { id, name, image_url, price, stock, Category } = el;
                    return { id, name, image_url, price, stock, category_name: Category.name };
                });
                res.status(200).json(results);
            })
            .catch((err) => {
                next(err);
            });
    }

    static update(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            CategoryId: +req.body.CategoryId
        };

        Product.update(newProduct, { where: { id: req.params.id } })
            .then((result) => {
                if (result[0]) {
                    return Product.findOne({
                        where: { id: req.params.id },
                        include: {
                            model: Category,
                            attributes: ["name"],
                        },
                    });
                } else {
                    next({ name: "NotFound", message: "Product is not Found" });
                }
            })
            .then(({ id, name, image_url, price, stock, Category }) => {
                res.status(200).json({
                    id,
                    name,
                    image_url,
                    price,
                    stock,
                    category_name: Category.name,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(result => {
                if (result) {
                    return res.status(200).json({ message: 'Product is sucessfully deleted' })
                } else {
                    return next({ name: 'NotFound', message: 'Product is not Found' })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController