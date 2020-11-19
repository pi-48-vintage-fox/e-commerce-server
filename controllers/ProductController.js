const { User, Product, Order } = require("../models/index");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const product = await Product.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const dataProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        S: req.body.S,
        M: req.body.M,
        L: req.body.L,
        XL: req.body.XL,
        price: req.body.price,
      };
      // console.log(dataProduct)
      const product = await Product.create(dataProduct, { returning: true });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const id = +req.params.id;
      const dataProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        S: req.body.S,
        M: req.body.M,
        L: req.body.L,
        XL: req.body.XL,
        price: req.body.price,
      };
      const product = await Product.update(dataProduct, {
        returning: true,
        where: {
          id,
        },
      });
      res.status(200).json(product[1][0]);
    } catch (err) {
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const id = +req.params.id;
      const product = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ messageSuccess: "Success delete product" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
