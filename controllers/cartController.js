const { Cart, Product, sequelize } = require('../models');

class CartController {
  static async showCart (req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const carts = await Cart.findAll({
        where: {
          user_id,
          status: 'Unpaid'
        },
        include: Product,
        order: [['createdAt', 'ASC']]
      })
      res.status(200).json(carts)
    } catch(err) {
      next(err);
    }
  }

  static async addToCart (req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const { product_id } = req.body;
      const newItem = await Cart.create({
        user_id, product_id, amount: 1, status: 'Unpaid'
      })
      res.status(201).json(newItem)
    } catch(err) {
      next(err);
    }
  }

  static async checkout (req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const t = await sequelize.transaction();
      const cart = await Cart.findAll({
        where: {
          user_id, status: 'unpaid'
        }
      }, {
        transaction: t
      });

      for(const item of cart) {
        const product = await Product.findByPk(item.product_id);
        if (item.amount > product.stock) {
          throw {name: 'MaximumAmountExceeded'}
        } else {
          let stock = product.stock - item.amount
          await product.update({stock})
          await item.update({status: 'Paid'})
        }
      }
      console.log('sampe <<<<<<<<<')
      t.afterCommit(() => {
        console.log('kelar dikit lg')
        return res.status(200).json({message: 'Success update stocks'})
      })
      await t.commit();
    } catch(err) {
      console.log(err)
      await t.rollback();
      next(err)
    }
  }

  static async updateAmount (req, res, next) {
    try {
      let nowAmount;
      const user_id = req.loggedIn.id;
      const product_id = req.params.id;
      const how = req.body.how;
      const cart = await Cart.findOne({
        where: {
          user_id, product_id
        }
      })
      if (how) {
        nowAmount = Number(cart.amount) + 1;
      } else {
        nowAmount = Number(cart.amount) - 1;
      }
      await Cart.update({
        amount: nowAmount
      }, {
        where: {
          user_id, product_id
        }
      })
      res.status(200).json({message: 'Update cart successful'});
    } catch(err) {
      next(err);
    }
  }
  
  static async deleteItem(req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const product_id = req.params.id;
      await Cart.destroy({
        where: {
          user_id, product_id
        }
      })
      res.status(200).json({message: 'Delete cart successful'})
    } catch(err) {
      next(err);
    }
  }
}

module.exports = CartController;