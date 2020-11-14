const {Category} = require('../models/index');

class CategoryController {
  static async getCategories(req, res){
    try {
      const getCategories = await Category.findAll();
      res.status(200).json(getCategories);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addCategory(req, res){
    try {
      const newCategory = {
        name: req.body.name
      };

      const insert = await Category.create(newCategory);
      res.status(201).json(insert);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteCategory(req, res){
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
      res.status(500).json(error)
    }
  }
}

module.exports = CategoryController