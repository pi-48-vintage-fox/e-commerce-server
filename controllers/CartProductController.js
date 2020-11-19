const { CartProduct, Product, Cart } = require('../models')

class CartProductController {
  static async findAll(req, res, next) {
    try {
      console.log('find all cart items')
      console.log(req.params, 'req.params')

      const items = await CartProduct.findAll({
        where: {
          CartId: req.params.CartId,
        },
        order: [['id']],
      })

      res.status(200).json(items)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      console.log('find cart item by id')
      console.log(req.params, 'req.params')

      const item = await Cart.findByPk({
        where: {
          id,
        },
      })

      console.log(item, '<<<< cart item find by id')

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }

  static async findByProduct(req, res, next) {
    try {
      console.log('find cart item by product')
      console.log(req.params, 'req.params')

      const item = await CartProduct.findOne({
        where: {
          ProductId: req.params.ProductId,
        },
      })

      console.log(item, '<<<< cart item find by product')

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }

  static async findByCartAndProduct(req, res, next) {
    try {
      console.log('find cart item by cart and product')
      console.log(req.params, 'req.params')

      const item = await CartProduct.findOne({
        where: {
          CartId: req.params.CartId,
          ProductId: req.params.ProductId,
        },
      })

      console.log(item, '<<<< item find by cart and product')

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      console.log('add cart item')
      console.log(req.body, 'req.body')

      const { CartId, ProductId, quantity } = req.body

      // Check if product exists
      try {
        const product = await Product.findByPk(ProductId)

        if (!product) {
          throw { status: 404, msg: 'Product was not found' }
        }

        console.log(product.toJSON(), 'produk ada')

        // Check if stock > quantity
        if (product.stock < quantity) {
          throw {
            status: 404,
            msg: 'Product stock is less than quantity requested',
          }
        }

        console.log('stok masih cukup')

        // Check if product is already added into cart
        try {
          const cartitem = await CartProduct.findOne({
            where: {
              CartId,
              ProductId,
            },
          })

          if (cartitem) {
            // Product is already added into cart -> update quantity
            console.log('produk sudah ada di cart -> update quantity')
            try {
              const updatedCartItem = await cartitem.update(
                {
                  quantity: cartitem.quantity + quantity,
                },
                {
                  returning: true,
                  plain: true,
                }
              )

              console.log(
                updatedCartItem.toJSON(),
                '<<<<<<<<<< updated cart item'
              )

              res.status(200).json(updatedCartItem)
            } catch (error) {
              next(error)
            }
          } else {
            // Product has not been added into cart -> create cartitem
            console.log('produk belum ada di cart -> create cart item')

            try {
              const newCartItem = await CartProduct.create({
                ProductId,
                quantity,
                CartId,
              })

              console.log(newCartItem.toJSON(), '<<<<<<<<<< new cart item')

              res.status(201).json(newCartItem)
            } catch (error) {
              next(error)
            }
          }
        } catch (error) {
          next(error)
        }
      } catch (error) {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateQuantity(req, res, next) {
    console.log('update cart item quantity')
    console.log(req.body, 'req.body')
    console.log(req.params, 'req.params')

    const { CartId, ProductId, quantity, CartProductId } = req.body

    if (!quantity || !ProductId || !CartId || !CartProductId) {
      throw {
        status: 400,
        msg: 'CartId, ProductId, CartProductId, and quantity is required',
      }
    }

    try {
      const product = await Product.findByPk(ProductId)

      if (!product) {
        throw { status: 404, msg: 'Product not found' }
      }

      console.log(product.toJSON(), '<<<< product')

      if (product.stock < quantity) {
        throw { status: 400, msg: 'Stock is not enough' }
      }

      try {
        const cartitem = await CartProduct.findByPk(CartProductId)

        if (!cartitem) {
          throw { status: 404, msg: 'Cart item not found' }
        }
        try {
          console.log(cartitem.toJSON(), '<<<<cart item')

          console.log({ quantity, CartProductId })

          const updatedCartitem = await CartProduct.update(
            {
              quantity,
            },
            {
              where: {
                id: CartProductId,
              },
              returning: true,
            }
          )

          console.log(updatedCartitem.toJSON(), '<<< updated cart item')

          res.status(200).json(updatedCartItem)

          // let price

          // try {
          //   const product = await Product.findByPk(req.params.ProductId)
          //   price = product.price

          //   console.log({ price })

          //   try {
          //     console.log('updating total price of cartitem')
          //     console.log('total', updatedCartitem.quantity * price)
          //     await CartProduct.update(
          //       {
          //         totalPrice: updatedCartitem.quantity * price,
          //       },
          //       {
          //         where: {
          //           // CartId: req.body.CartId,
          //           // ProductId: req.body.ProductId,
          //           id: CartProductId,
          //         },
          //       }
          //     )
          //   } catch (error) {
          //     next(error)
          //   }

          //   res.status(200).json({
          //     msg: "Cart item's quantity was modified succesfully",
          //   })
          // } catch (error) {
          //   next(error)
          // }
        } catch (error) {
          next(error)
        }
      } catch (error) {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    console.log('update cartitem')
    console.log(req.params, 'req.params')

    const { totalPrice, name, quantity } = req.body

    try {
      const updatedCartitem = await CartProduct.update(
        { totalPrice, name, quantity },
        {
          where: {
            CartId: req.params.CartId,
            ProductId: req.params.ProductId,
          },
          returning: true,
        }
      )

      res.status(200).json(updatedCartitem, '<<<<< updated cartitem')
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      console.log('remove item from cart')
      console.log(req.params, 'req.params')

      await CartProduct.destroy({
        where: {
          CartId: req.params.CartId,
          ProductId: req.params.ProductId,
        },
      })

      res.status(200).json({
        msg: 'Cart item was removed successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartProductController
