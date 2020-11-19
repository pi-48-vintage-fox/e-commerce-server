const {
  Cart,
  CartProduct,
  Product
} = require('../models')


class CartController {

  static async addCart(req, res) {
    const {
      productId,
      quantity
    } = req.body
    const objCartProd = {
      ProductId: +productId,
      quantity: +quantity
    }
    const newCart = {
      UserId: req.loggedInUser.id
    }
    try {

      const cartprod = await CartProduct.findOne({
        where: {
          ProductId: objCartProd.ProductId,
        },
        attributes: {
          include: ['id']
        }
      })
      if (cartprod) {
        const objCart = await Cart.findOne({
          where: {
            status: 'unpaid',
            id: cartprod.CartId
          }
        })
        if (objCart) {
          console.log('masuk true');
          const product = await Product.findByPk(objCartProd.ProductId)
          console.log(product, 'ini product');
          const quantity = cartprod.quantity + objCartProd.quantity
          const newTotal = quantity * product.price
          const newQuantity = {
            quantity,
            total: newTotal
          }
          console.log('ini di line 42 <<<<,');
          const updateCartProd = await CartProduct.update(newQuantity, {
            where: {
              id: cartprod.id
            },
            returning: true
          })
          console.log(updateCartProd);
          res.status(200).json({
            cartProd: updateCartProd[1][0]
          });

        } else {
          const cart = await Cart.create(newCart)
          console.log(cart.id)
          const product = await Product.findOne({
            where: {
              id: productId
            }
          })
          console.log(product.id, product.price, '<<<<<<');

          const newCartProdOBj = {
            CartId: cart.id,
            ProductId: objCartProd.ProductId,
            quantity: objCartProd.quantity,
            total: product.price * objCartProd.quantity,
          }
          const newCartProd = await CartProduct.create(newCartProdOBj)
          res.status(201).json({
            newCartProd
          })
        }
      } else {
        const cart = await Cart.create(newCart)
        console.log(cart)
        const product = await Product.findOne({
          where: {
            id: productId
          }
        })
        console.log(product.id, product.price, '<<<<<<');

        const newCartProdOBj = {
          CartId: cart.id,
          ProductId: objCartProd.ProductId,
          quantity: objCartProd.quantity,
          total: product.price * objCartProd.quantity,
        }
        const newCartProd = await CartProduct.create(newCartProdOBj)
        res.status(201).json({
          newCartProd
        })
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static showCartByUserId(req, res, next) {

    const UserId = +req.loggedInUser.id
    Cart.findAll({
        where: {
          UserId,
          status: 'unpaid'
        },
        order: [
          ['id', 'ASC']
        ],
        include: Product
      })
      .then(data => {
        let carts = data.map(el => {
          let obj = {
            id: el.id,
            product: el.Products[0].name,
            productId: el.Products[0].id,
            image_url: el.Products[0].image_url,
            price: el.Products[0].price,
            quantity: el.Products[0].CartProduct.quantity,
            total: el.Products[0].CartProduct.total
          }
          return obj
        })
        res.status(200).json({
          carts
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteCart(req, res, next) {
    let id = req.params.id
    Cart.destroy({
        where: {
          id: id
        },
      })
      .then(() => {
        res.status(200).json({
          msg: 'successfully deleted cart'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static updateQuantity(req, res, next) {
    let id = +req.params.id
    let {
      quantity,
      total
    } = req.body
    CartProduct.update({
        quantity,
        total
      }, {
        where: {
          CartId: id
        },
        returning: true
      })
      .then(cart => {
        console.log(cart);

        res.status(200).json({
          cart: cart[1][0]
        })
      })
      .catch(err => {
        console.log(err, 'ini errror ===>')
        next(err)
      })
  }
  static checkOut(req, res, next) {
    const {
      carts
    } = req.body
    let cartId = carts.map(el => {
      return el.id
    })
    let productId = carts.map(el => {
      return el.productId
    })
    let quantity = carts.map(el => {
      return el.quantity
    })
    console.log(cartId);

    Cart.update({
        status: 'paid'
      }, {
        where: {
          id: cartId
        },
        returning: true
      })
      .then(data => {
        console.log('sukses', data);
        res.status(200).json({
          data
        })
        return Product.findAll({
          where: {
            id: productId
          }
        })
      })
      .then(instances => {
        console.log(instances);
        for (let i = 0; i < instances.length; i++) {
          instances[i].decrement('stock', {
            by: quantity[i]
          })
        }
      })
      .then(() => {
        console.log('quantity success');
        res.status(200).json({
          msg: 'checkout sukses'
        })
      })
      .catch(err => {
        console.log(err, 'gagal');
        next(err)
      })

  }
}
module.exports = CartController