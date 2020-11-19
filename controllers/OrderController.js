const { User, Product, Order } = require("../models/index");
const { Op } = require("sequelize");

class OrderController {
  static async getAllOrders(req, res, next) {
    try {
      const order = await Order.findAll({
        include: [User, Product],
        order: [["id", "ASC"]],
        where: {
          quantity: {
            [Op.gt]: 0
          }
        }
      });
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const UserId = +req.decoded.id;
      const findOrder = await Order.findOne({
        where: {
          ProductId: req.body.ProductId,
          UserId,
          size: req.body.size,
          status: false
        }
      })
      if(!findOrder || findOrder == null) {
        const data = {
          UserId,
          ProductId: req.body.ProductId,
          status: false,
          size: req.body.size,
          quantity: req.body.quantity,
          address: req.body.address,
          totalPrice: req.body.totalPrice,
          tracking: "waiting for payment"
        };
        const order = await Order.create(data, { returning: true });
        res.status(201).json(order);
      } else {
        let quantity = {
          quantity: findOrder.quantity + req.body.quantity
        }
        await Order.update(quantity, {
          where: {
            id: findOrder.id
          }
        })
        res.status(200).json({ msg: 'Quantity updated' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editOrder(req, res, next) {
    try {
      const id = +req.params.id;
      const data = {
        UserId: req.body.UserId,
        ProductId: req.body.ProductId,
        status: req.body.status,
        size: req.body.size,
        quantity: req.body.quantity,
        address: req.body.address,
        totalPrice: req.body.totalPrice,
        tracking: req.body.tracking,
      };
      const order = await Order.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json(order[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusOrder(req, res, next) {
    try {
      const id = +req.params.id;
      const data = {
        UserId: req.body.UserId,
        ProductId: req.body.ProductId,
        status: req.body.status,
        size: req.body.size,
        quantity: req.body.quantity,
        address: req.body.address,
        totalPrice: req.body.totalPrice,
        tracking: req.body.tracking,
      };
      const order = await Order.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json({ msg: "Success update status" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const id = +req.params.id;
      const order = await Order.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ msg: "Successfully delete" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
