const { User, Product, Order } = require("../models/index");

class OrderController {
    static async getAllOrders(req, res, next) {
        try {
            const order = await Order.findAll({
                include: [User, Product]
            })
            res.status(200).json(order)
        } catch (err) {
            next(err)
        }
    }
    static async updateStatusOrder(req, res, next) {
        try {
            const id = +req.params.id
            let update = {
                status: req.body.status
            }
            const order = await Order.update(update, {
                where: {
                    id
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController