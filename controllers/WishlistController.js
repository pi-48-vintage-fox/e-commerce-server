const { User, Product, Order } = require("../models/index");
const { Op } = require("sequelize");

class Wishlist {
    static async getAllWishlist(req, res, next) {
        try {
            const order = await Order.findAll({
              include: [User, Product],
              order: [["id", "ASC"]],
              where: {
                wishlist: true
              }
            });
            res.status(200).json(order);
          } catch (err) {
            next(err);
          }
    }
    static async addWishlist(req, res, next) {}
}

module.exports = Wishlist