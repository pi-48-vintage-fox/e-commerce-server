const { User, Product, Cart } = require("../models/index")

class CartController {
    static getCart(req, res, next) {
        let userId = req.isLogin.id
        User.findAll({
            where: {
                id: userId
            },
            include: [Product]
        })
        .then(result => {
            res.status(200).json(result[0])
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }

    static getCartById(req, res, next) {
        let userId = req.isLogin.id
        let productId = +req.params.id

        Cart.findOne({
            where: {
                UserId: userId,
                ProductId: productId
            },
            include: [Product]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }

    static postCart(req, res, next) {
        let dataCart = {
            UserId: req.isLogin.id,
            ProductId: req.body.ProductId,
            quantity: 1,
            status: 'keranjang'
        }

        let qtyStock = 0
        Product.findOne({
            where: {
                id: dataCart.ProductId
            }
        })
        .then(dataProduct => {
            qtyStock = dataProduct.stock
            return Cart.findOne({
                where: {
                    UserId: dataCart.UserId,
                    ProductId: dataCart.ProductId
                }
            })
        })
        .then(result => {
           if (!result) {
               return Cart.create(dataCart)
           } else if (result.quantity >= qtyStock) {
               throw { message: "stock tidak cukup", status: 401 }
           } else {
               return Cart.increment('quantity',{
                   where: {
                       ProductId: dataCart.ProductId
                   }
               })
           }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static deleteCart(req, res, next) {

        Cart.destroy({
            where: {
                UserId: req.isLogin.id,
                ProductId: req.body.ProductId
            }
        })
        .then(() => {
            res.status(200).json({message: "Cart success Deleted"})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static patchCart (req, res, next) {
        let userId = req.isLogin.id
        let productId = req.body.ProductId
        let qty = req.body.quantity

        Product.findOne({
            where: {
                id: productId
            }
        })
        .then(result => {
            if (qty > result.stock ) {
                throw { message: 'Stock tidak cukup', status: 400}
            } else {
                Cart.update({quantity: qty}, {
                    where: {
                        UserId: userId,
                        ProductId: productId
                    },
                    returning: true
                })
            }
        })
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = CartController