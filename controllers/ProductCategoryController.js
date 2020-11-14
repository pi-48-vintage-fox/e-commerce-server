const { ProductCategory, Product } = require('../models')

class ProductCategoryController {
  static categories(req, res, next) {
    console.log('getting categories')
    ProductCategory.findAll()
      .then((categories) => {
        res.status(200).json(categories)
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static findById(req, res, next) {
    console.log('getting category details:', req.params.id)
    ProductCategory.findByPk(req.params.id)
      .then((category) => {
        res.status(200).json(category)
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static addCategory(req, res, next) {
    const { name, parentId } = req.body
    let input = {
      name,
      parentId,
    }

    // const category = await ProductCategory.findOne({
    //   where: {
    //     name: input.name,
    //     parentId: input.parentId,
    //   },
    // })

    // if (category) {
    //   throw {
    //     status: 409,
    //     msg:
    //       'Category with the same name already exists, please choose another name',
    //   }
    // } else {

    if (parentId) {
      ProductCategory.findByPk(parentId)
        .then((result) => {
          console.log()
          if (!result) {
            throw { status: 404, msg: 'Product category not found' }
          }
        })
        .catch((err) => {
          console.log(err)
          next(err)
        })
    } else {
      ProductCategory.create(input)
        .then((category) => {
          res.status(201).json(category)
        })
        .catch((err) => {
          console.log(err)
          next(err)
        })
    }
  }

  static deleteCategory(req, res, next) {
    console.log(req.params, '<<<< req params delete category controller')
    ProductCategory.destroy({
      where: {
        id: req.params.CategoryId,
      },
    })
      .then((result) => {
        if (result === 0) {
          throw { status: 404, msg: 'Category was not found' }
        }

        res.status(200).json({ msg: 'Category was deleted successfully' })
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static putCategory(req, res, next) {
    console.log(req.body, '<<<<<<<<<< putCategory')

    let input = {}

    for (let key in req.body) {
      if (req.body[key]) {
        input[key] = req.body[key]
      }
    }

    ProductCategory.update(input, {
      where: {
        id: req.params.CategoryId,
      },
    })

    res
      .status(200)
      .json({ msg: 'Category was modified successfully' })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = ProductCategoryController
