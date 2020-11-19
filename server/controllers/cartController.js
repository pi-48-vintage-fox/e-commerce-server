const { response } = require('express');
const { Product, Cart } = require('../models/index')

class cartController {
  static showAllCart(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.loggedInUser.id
      },
      order: [['id', 'ASC']],
      include: Product 
    })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
    })
  }

  static createCart(req, res, next) {
    const id = req.loggedInUser.id
    let obj  = {
      UserId: id,
      ProductId: +req.body.ProductId,
      quantity: +req.body.quantity,
      status: true
    }
    Cart.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  static updateCart(req, res, next) {
    let UserId = req.loggedInUser.id
    let ProductId = req.params.id
    Cart.findOne({
      where: {
        UserId: +UserId,
        ProductId: +ProductId
      }
    })
      .then(data => {
        data.quantity += +req.body.quantity
        return data.update({
          quantity: +data.quantity
        })
      })
      .then(response => {
        if (response) {
          res.status(200).json(response)
        } else {
          res.status(400).json({ message: 'Cannot update quantity' })
        }
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    let UserId = req.loggedInUser.id
    let ProductId = req.params.id
    Cart.destroy({
      where: {
        UserId: +UserId,
        ProductId: ProductId
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Item has been deleted from the Cart.'})
    })
    .catch(err => {
      console.log(err);
    })
  }

  static showCartById(req, res, next) {
    Cart.findOne({
      where: {
        UserId: +req.loggedInUser.id,
        ProductId: +req.params.id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = cartController