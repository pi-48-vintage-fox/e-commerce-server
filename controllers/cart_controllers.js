const {Cart, Product} = require('../models/index')
const { Op } = require('sequelize')

class CartController {
    static viewCart (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.loggedInUser.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addToCard (req, res, next) {
        const payload = {
            ProductId: req.body.ProductId,
            quantity: req.body.quantity,
            total_price: req.body.quantity * req.body.product_price,
            UserId: req.loggedInUser.id
        }
        console.log(payload)
        Cart.create(payload)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })

    }

    static updateCart (req, res, next) {
        const id = req.params.id
        const payload = {
            quantity: req.body.quantity
        }
        Product.findByPk(id)
        .then(product => {
            if(!product) {
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else if (payload.quantity > product.quantity) {
                let err = {
                    name: 'Bad Request'
                }
                throw next(err)
            }
            else if(product.quantity > payload.quantity) {
                return Cart.update(payload, {
                    where: {
                        ProductId: id
                    }
                })
            }
        })
        .then(data => {
            if(data == 0) {
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(data){
                res.status(200).json({msg: 'Sucessfully update from cart'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteFromCart (req, res, next) {
        const id = req.params.id
        Cart.destroy({
            where: {
                id: id
            }
        })
        .then(data => {
            if(data === 0) {
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            if(data){
                res.status(200).json({msg: 'Sucessfully delete from cart'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static checkOut (req, res, next) {
        let updatedStock
        Cart.findAll({
            where: {
                UserId: req.loggedInUser.id
            }
        })
        .then(data => {
            updatedStock = data
            let products = []
            for(let i = 0; i<data.length; i++) {
                products.push({id: data[i].ProductId, stock: data[i].quantity})
            }
            return Product.findAll({
                where: {
                    [Op.or]: products
                }
            })
        })
        .then(data => {
            for(let i = 0; i<data.length; i++) {
                for(let j = 0; j<updatedStock.length; j++){
                    if(data[i].id === updatedStock[j].ProductId){
                        data[i].stock -= updatedStock[j].quantity
                        data[i].save()
                    }
                }
            }
            return Cart.destroy({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
        })
        .then(data => {
            res.status(200).json('Your puchase has been made')
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController
