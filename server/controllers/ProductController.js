const {Product} = require("../models/")

class ProductController {
    static async add(req,res,next){
        try {
            const {name,image_url,price,stock} = req.body
            if(!name || !image_url || !price || !stock){
                throw {name: 'Please fill all form'}
            }
            else{
                const obj = {name,image_url,price,stock}
                const prod = await Product.create(obj)
                res.status(201).json(prod)
            }
        } catch (error) {
            next(error)
        }
    }
    static async edit(req,res,next){
        try {
            const {name,image_url,price,stock} = req.body
            if(!name || !image_url || !price || !stock){
                throw {name: 'Please fill all form'}
            }else{
                const obj = {name,image_url,price,stock}
                const {id} = req.params
                const data = await Product.findByPk(id)
                if(!data){
                    throw {name : 'Data Not Found'}
                }else{
                    const prod = await Product.update(obj,{where:{id},returning:true})
                    res.status(200).json(prod[1][0])
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async delete(req,res,next){
        try {
            const {id} = req.params
            const data = await Product.destroy({where:{id}})
            if(data === 1){
                res.status(200).json({msg: 'Product Deleted'})
            }else{
                throw {name:"Data Not Found"}
            }
        } catch (error) {
            next(error)
        }
    }
    static async list(req,res,next){
        try {
            const data = await Product.findAll({order: [['id','ASC']]})
            res.status(200).json(data)
        } catch (error) {
            next(error)            
        }
    }
}

module.exports=ProductController