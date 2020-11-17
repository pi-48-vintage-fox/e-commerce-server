const {Cart, Product} = require('../models/index');

class CartController {
  static async getCart (req, res, next) {
    try {
      const getCart = await Cart.findAll({
        include: [Product],
        where: {
          UserId: +req.userLogin.id
        }
      });
      res.status(200).json(getCart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addCart (req, res, next) {
    const addCart = {
      ProductId: +req.body.ProductId,
      UserId: +req.userLogin.id,
      gty: +req.body.qty,
      status: 'pending'
    }
    console.log(addCart);
    try {
      const insert = await Cart.create(addCart);
      res.status(201).json(insert);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async cartCheckout(req, res, next) {
    try {
      const changeStatus = await Cart.update({
        data: {
          status: 'checkout'
        },
        where: {
          ProductId: +req.params.id
        }
      });
      res.status(200).json(changeStatus);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController