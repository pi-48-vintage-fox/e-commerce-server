const { User } =  require('../models/index')
const { Hash, CompareHash } = require('../helpers/hash')
const { SignToken } = require('../helpers/jwt')


class Controller{
    static async register(req, res, next){
        try{
            const obj = {
                email:req.body.email,
                password:Hash(req.body.password),
                role:'Customer'
            }
        const user = await User.create(obj)
        return res.status(201).json({
            message: "suscces register an acount"
        })
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async login(req, res, next){
        try{
            const input = {
                email:req.body.email,
                password:req.body.password,
            }
            const user = await User.findOne({
                    where:{
                        email: input.email
                    }
                })
                if(!user){
                    res.status(401).json({
                        message: "Wrong email or Password"
                    })
                }else if(!CompareHash(input.password, user.password)){
                    res.status(401).json({
                        message: "Wrong Password"
                    })
                }else{
                    const decoded = SignToken({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }); 
                    res.status(200).json({access_token: decoded})
                }
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = Controller