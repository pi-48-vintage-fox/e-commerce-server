const {
  Cart,
  Product
} = require('../models')

class CartController {

  static createCart(req, res, next) {

    //CHECK PRODUCT
    // check produk apakah ada apa nggak
    // kalo produk ada, apakah stok masih lebih besar daripada quantity yang diminta

    // CHECK CART
    // cek apakah cart dengan UserId,ProductId, status="new" ada?
    // kalau cart sudah ada berarti tinggal nambah quantity aja, (gak perlu create cart)
    // kalau cart belom ada, baru create cart

    Product.findOne({
        where: {
          id: req.params.ProductId
        }
      })
      .then((product) => {
        console.log('<<<< ini dapat di create cart 1');
        if (!product) {
          console.log('<<< ini dapat di create cart 2');
          throw {
            name: "BadRequest",
            message: "Product doesn't exist"
          }
        } else if (product.stock < req.body.quantity) {
          console.log('<<<< ini dapat dicreate cart 3');
          throw {
            name: "BadRequest",
            message: "Stock doesn't enough"
          }
        } else {
          console.log('<<<<< ini dapat dicreate cart 4');
          return Cart.findOne({
              where: {
                UserId: req.userData.id,
                ProductId: req.params.ProductId,
                status: "New"
              }
            })
            .then((cart) => {
              if (cart) {
                console.log('<<<<<<< ini dapat di create cart 5');
                let quantity = cart.quantity + 1
                return cart.update({
                  quantity
                })

              } else {
                console.log('<<<<<< ini dapat di create cart 6');
                let newCart = {
                  UserId: req.userData.id,
                  ProductId: req.params.ProductId,
                  quantity: req.body.quantity
                }
                return Cart.create(newCart)
              }
            })
            .then((result) => {
              // console.log(result);
              res.status(201).json(result)
            })
            .catch((err) => {
              console.log(err);
              next(err)
            })
        }
      })
  }

  static showCart(req, res, next) {
    console.log(req.userData.id);
    Cart.findAll({
        where: {
          UserId: +req.userData.id
        },
        include: Product
      })
      .then((result) => {
        console.log(result);
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static updateCart(req, res, next) {

    const id = req.params.ProductId
    const {
      qty
    } = req.body

    Cart.findOne({
        where: {
          id
        },
        include: Product
      })
      .then((result) => {
        console.log(result.Product);
        if (qty > 0) {
          if (result.Product.stock < result.quantity + 1) {
            res.status(400).json({
              message: 'quantity lebih dari stock'
            })
          } else {
            return Cart.update({
                quantity: result.quantity + 1
              }, {
                where: {
                  id
                }
              })
              .then((data) => {
                res.status(200).json(data)
              })
          }
        } else {
          if (result.quantity - 1 < 1) {
            res.status(400).json({
              message: 'Cart cannot less than one'
            })
          } else {
            return Cart.update({
                quantity: result.quantity - 1
              }, {
                where: {
                  id
                }
              })
              .then((data) => {
                res.status(200).json(data)
              })
          }
        }

      })
      .catch((err) => {
        next(err)
      })


    // Cart.update(cartQty, {
    //     where: id
    //   })
    //   .then((result) => {
    //     res.status(200).json(result)
    //   })
    //   .catch((err) => {
    //     next(err)
    //   })
  }

  static deleteCart(req, res, next) {
    const id = +req.params.ProductId
    Cart.destroy({
        where: {
          id
        }
      })
      .then((result) => {
        res.status(200).json({
          result
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = CartController