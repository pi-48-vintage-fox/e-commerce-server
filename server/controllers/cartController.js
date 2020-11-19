const {Cart, Product} = require('../models/index')

class Controller{
    static async addCart(req,res,next){
        try{
            const cart = await Cart.findOne({
                where:{
                    UserId:req.decoded.id,
                    ProductId:+req.params.id,
                    status:'unpaid'
                }
            })
            if(cart){
                try{
                    await cart.update({
                        qty: cart.qty + 1
                    })
                    res.status(200).json(cart)
                }catch(err){
                    console.log(err)
                }
            }else{
                try{
                    const createCart = await Cart.create({
                    UserId:req.decoded.id,
                    ProductId:+req.params.id,
                    qty: 1,
                    status: 'unpaid'
                    })
                    res.status(201).json(createCart)
                }catch(err){
                    console.log(err)
                }
            }
        }catch(err){
            console.log(req.decoded.id)
            next(err)
        }
    }

    static async readCart(req,res,next){
        try{
            let cart = await Cart.findAll({
                where:{
                    UserId:req.decoded.id
                },
                include: Product
            })
            res.status(200).json(cart)
        }catch(err){
            next(err)
        }
    }

    static async editCart(req,res,next){
        const id = +req.params.id
        try{
            let obj = {
                qty: +req.body.qty
            }
            let cart = await Cart.update(obj,{
                where:{
                    id
                }
            })
            res.status(200).json({message: 'update succes'})
        }catch(err){
            next(err)
        }
    }

    static async delete(req,res,next){
        try{
            let cart = await Cart.destroy({
                where:{
                    ProductId: req.params.id
                }
            })
            res.status(200).json({message:"delete succes"})
        }catch(err){
            next(err)
        }
    }
}

module.exports = Controller