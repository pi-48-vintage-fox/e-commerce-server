const { Product } = require('../models')

class productController{

  static addProduct(req, res, next) {

    const {name, image_url, price, stock} = req.body
    
    const newProduct = {
      name,
      image_url,
      price,
      stock
    }

    Product.create(newProduct)
      .then(product => {
        res.status(201).json({
          id: product.id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock
        })
        
      })
      .catch(err => {
        next(err)
      })
  }
  
  static showProduct (req, res, next) {

    Product.findAll()
      .then(products => {
        res.status(200).json({products})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showProductById (req, res, next) {

    let id = +req.params.id
    
    Product.findByPk(id)
      .then(product => {
        res.status(200).json({
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static updateProduct (req, res, next) {

    let id = +req.params.id

    const { name, image_url, price, stock } = req.body

    const updateDataProduct = {
      name,
      image_url,
      price,
      stock
    }

    Product.update(updateDataProduct, {
      where: {
        id: id
      },
      returning: true
    })
      .then(product => {
        //console.log(product[1][0].id, '<<<<');
        
        res.status(200).json({
          name: product[1][0].name,
          image_url: product[1][0].image_url,
          price: product[1][0].price,
          stock: product[1][0].stock
        })
      })
      .catch(err => {
        next(err)
        
      })
  }

  static deleteProduct(req, res, err) {

    let id = +req.params.id

    Product.destroy({
      where : {
        id: id
      }
    })
      .then(() => {
        res.status(200).json({msg: 'product has been successfully deleted'})

      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = productController