const { Product, Cart, Sequelize } = require('../models/index')

class CartController {
  static addToCart(req, res, next) {
    const obj = {
      UserId: req.userLogin.id,
      ProductId: req.body.ProductId,
      quantity: req.body.quantity
    }
    Cart.findOne({
      where: {
        ProductId: obj.ProductId,
        UserId: obj.UserId
      }
    })
    .then(data => {
      if(!data) {
        return Cart.create(obj)
      }
      else {
        return Cart.update({
          quantity: Sequelize.literal('quantity + 1')
        }, {
          where: {
            ProductId: obj.ProductId,
            UserId: obj.UserId
          }
        })
      }
    })
    .then(data => {
      console.log(data)
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showCart(req, res, next) {
    console.log(req.userLogin)
    Cart.findAll({
      where: {
        UserId: req.userLogin.id
      },
      order: [['updatedAt', 'DESC']],
      include: Product
    })
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static changeQuantity(req, res, next) {
    const ProductId = +req.body.ProductId
    const UserId = req.userLogin.id
    Cart.update({ quantity: req.body.quantity }, {
      where: {
        UserId: UserId,
        ProductId: ProductId
      }
    })
    .then(() => {
      console.log('Cart quantity successfully updated!')
      res.status(200).json({msg: 'Cart quantity successfully updated!'})
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCart(req, res, next) {
    console.log("DALAM DELETE CART!!!")
    const ProductId = +req.body.ProductId
    const UserId = req.userLogin.id
    console.log(ProductId, UserId)
    Cart.destroy({
      where: {
        UserId: UserId,
        ProductId: ProductId
      }
    })
    .then(() => {
      console.log('Item has been removed from cart!')
      res.status(200).json({msg: 'Item has been removed from cart!'})
    })
    .catch(err => {
      console.log("error cuk")
      console.log(err)
      next(err)
    })
  }
}

module.exports = CartController