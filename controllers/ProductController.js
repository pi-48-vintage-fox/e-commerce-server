const { Product } = require('../models')

class ProductController {
  static products(req, res, next) {
    console.log('getting products')
    console.log(req.query, '<<< product query')

    if (req.query.category) {
      Product.findAll({
        order: [['id']],
        include: 'ProductCategory',
        where: {
          ProductCategoryId: req.query.category,
        },
      })
        .then((products) => {
          res.status(200).json(products)
        })

        .catch((err) => {
          console.log(err)
          next(err)
        })
    } else {
      Product.findAll({
        order: [['id']],
        include: 'ProductCategory',
      })
        .then((products) => {
          res.status(200).json(products)
        })

        .catch((err) => {
          console.log(err)
          next(err)
        })
    }
  }

  static findProductById(req, res, next) {
    console.log('getting product details')
    console.log(req.params, '<<< req.params')

    Product.findByPk(req.params.ProductId)
      .then((product) => {
        console.log(product)
        res.status(200).json(product)
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static addProduct(req, res, next) {
    const {
      name,
      price,
      stock,
      ProductCategoryId,
      description,
      imageUrl,
      imageId,
    } = req.body

    let input = {
      name,
      price,
      stock,
      ProductCategoryId,
      description,
      imageUrl,
      imageId,
    }

    if (!ProductCategoryId) {
      input.ProductCategoryId = 1
    }

    // const product = await Product.findOne({
    //   where: {
    //      name,
    //      price,
    //      stock,
    //      ProductCategoryId,
    //      description,
    //      imageUrl,
    //      imageId,
    //   },
    // })

    // if (product) {
    //   throw {
    //     status: 409,
    //     msg:
    //       'Product with the same name already exists, please choose another name',
    //   }
    // } else {

    // console.log({ input })
    Product.create(input)
      .then((product) => {
        // console.log(product.toJSON())
        res.status(201).json(product)
      })
      .catch((err) => {
        console.log(err, '<<<< error add product (controller)')
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    console.log(req.params, '<<<< req params delete product controller')
    Product.destroy({
      where: {
        id: req.params.ProductId,
      },
    })
      .then((result) => {
        if (result === 0) {
          throw { status: 404, msg: 'Product was not found' }
        }

        res.status(200).json({ msg: 'Product was deleted successfully' })
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static putProduct(req, res, next) {
    console.log(req.body, '<<<<<<<<<< putProduct')

    if (Object.entries(req.body).length === 0) {
      return res.status(200).json({ msg: 'Nothing was modified' })
    }

    // console.log({ input })
    Product.update(req.body, {
      where: {
        id: req.params.ProductId,
      },
    })
      .then((result) => {
        res.status(200).json({ msg: 'Product was modified successfully' })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = ProductController
