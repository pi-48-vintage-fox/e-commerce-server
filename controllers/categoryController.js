const {Category} = require('../models/index');

class CategoryController {
  static async getCategories(req, res, next){
    try {
      const getCategories = await Category.findAll();
      res.status(200).json(getCategories);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next){
    try {
      const newCategory = {
        name: req.body.name
      };

      const insert = await Category.create(newCategory);
      res.status(201).json(insert);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next){
    try {
      const deleteCategory = await Category.destroy({
        where: {
          id: +req.params.id
        }
      });

      if (deleteCategory) {
        res.status(200).json({
          message: 'Category deleted'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController