const {Cart, Product} = require('../models/index');

class CartController {
  static async getCart (req, res, next) {
    try {
      const getCart = await Cart.findAll({
        include: [Product],
        where: {
          UserId: +req.userLogin.id,
          status: 'pending'
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
    try {
      const insert = await Cart.create(addCart);
      res.status(201).json(insert);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const deleteCart = await Cart.destroy({
        where: {
          UserId: +req.userLogin.id,
          ProductId: +req.params.id
        }
      })
      res.status(200).json(deleteCart);
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static patchCart(req, res, next) {
    Cart.findOne({
      where: {
        UserId: +req.userLogin.id,
        ProductId: +req.params.id
      }
    })
      .then(find => {
        find.gty += req.body.qty
        return find.update({
          gty: find.gty
        })
      })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          res.json({
            message: 'failed update'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static async findCartId(req, res, next) {
    try {
      const find = await Cart.findOne({
        where: {
          UserId: +req.userLogin.id,
          ProductId: +req.params.id
        }
      })
      res.status(200).json(find);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController