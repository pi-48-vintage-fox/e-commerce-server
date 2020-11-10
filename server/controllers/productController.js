const { Product } = require('../models')

class productController{

  static addProduct(req, res) {

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
        if(err.errors[0].validatorName === 'notEmpty'){
          console.log(err.name, 'ini do product controller');
          //console.log(err);
          return res.status(400).json({msg: 'please fill in the field'})
        }
        if(err.errors[0].validatorName === 'min'){
            //console.log();
            return res.status(400).json({msg: 'price or stock must greater than 0'})    
        }
        if(err.errors[0].validatorName == 'isNumeric'){
          return res.status(400).json({msg: 'price or stock must be number'}) 
        }
        else {

          console.log(err.errors[0].validatorName);
          return res.status(500).json(err)
        }
      })
  }
  
  static showProduct (req, res) {

    Product.findAll()
      .then(products => {
        res.status(200).json({products})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showProductById (req, res) {

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
        res.status(500).json(err)
      })
  }
  static updateProduct (req, res) {

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
        console.log(err);
        res.status(500).json({err})
        
      })
  }

  static deleteProduct(req, res) {

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
        res.status(500).json(err)
      })

  }
}

module.exports = productController