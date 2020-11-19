'use strict'

const { Category } = require('../models')

class CategoryController {

  static async index(req, res, next) {
    try {
      let categories = await Category.findAll({
        order: [['id', 'ASC']]
      })

      res.status(200).json({
        msg: 'Categories fetched',
        categories
      })
    } catch (error) {
      next(error)
    }
  }

  static async insert(req, res, next) {
    try {
      let data = {
        name: req.body.name
      }

      let category = await Category.create(data)

      res.status(200).json({
        msg: 'Category added',
        category
      })

    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let data = {
        name: req.body.name
      }

      let category = await Category.findOne({
        where: {
          id: req.params.id
        }
      })
      category.name = data.name
      category.save()
      res.status(200).json({
        msg: 'Category Updated',
        category
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let category = await Category.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        msg: 'Category deleted',
        category
      })
      category.destroy()
      category.save()
    } catch (error) {
      next(error)
    }
  }

}

module.exports = CategoryController