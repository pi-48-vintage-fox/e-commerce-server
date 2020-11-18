'use strict'

const { Wishlist, Product, User } = require('../models')

class WishlistController {
  static async index(req, res, next) {
    try {
      let wishlists = await Wishlist.findAll({
        where:{
          UserId: req.loggedInUser.id
        },
        include: Product
      })

      res.status(200).json({
        msg: 'Wishlist Fetched',
        wishlists
      })


    } catch (error) {
      next(error)
    }
  }
  static async insert(req, res, next) {
    try {
      let data = {
        UserId: req.loggedInUser.id,
        ProductId : req.body.ProductId
      }

      let wishlist = await Wishlist.create(data)

      res.status(200).json({
        msg: 'Wishlist added',
        wishlist
      })
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      let wishlist = await Wishlist.findOne({
        where:{
          id:req.params.id,
          UserId: req.loggedInUser.id
        }
      })

      res.status(200).json({
        msg: 'Wishlist deleted',
        wishlist
      })
      wishlist.destroy()
      wishlist.save()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WishlistController