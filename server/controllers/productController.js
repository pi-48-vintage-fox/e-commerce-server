const { Product } =  require('../models/index')

class Controller {
    static addProduct(req, res, next){
        let date = new Date()
        const obj = {
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock,
            UserId:req.decoded.id,
            createdAt: date,
            updatedAt: date
        }
        Product.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static readProduct(req,res,next){
        Product.findAll()
        .then(result => {
        res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static readById(req, res) {
        Todo.findByPk({
            where: {
                UserId: req.decoded.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static editProduct(req,res) {
        const id = +req.params.id
        const obj = {
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock,
        }
        Product.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const id = +req.params.id
        Product.destroy({
            where:{
                id
            }
        })
        .then(result => {    
        res.status(200).json({message: 'Deleted Success'})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = Controller