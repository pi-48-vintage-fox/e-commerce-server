const {User,Task} = require("../models")
const jwt = require("../helpers/jwt")

class Auth {
    static async authorization(req,res,next){
        try {
            if(!req.userLogin){
                throw {name: "You dont have access"}
            }else{
                next()
            }
        } catch (error) {
            next(error)
        }
    }

    static async authCustomer(req, res, next){
        try {
            const {access_token} = req.headers
            if(!access_token){
                throw {name: "You dont have access"}
            }else{
                const decode = jwt.verifyToken(access_token)
                if(decode.role !== 'customer'){
                    throw {name: "You dont have access"}
                }else{
                    const user = await User.findByPk(decode.id)
                    if(!user){
                        throw {name: "You dont have access"}
                    }
                    else if(user.role !== 'customer'){
                        throw {name: "You dont have access"}
                    }
                    else{
                        req.userLogin = decode
                        next()
                    }
                }
            }
            
        } catch (err) {
            next(err)
        }
    }

    static async authentication(req, res, next){
        try {
            const {access_token} = req.headers
            if(!access_token){
                throw {name: "You dont have access"}
            }else{
                const decode = jwt.verifyToken(access_token)
                if(decode.role !== 'admin'){
                    throw {name: "You dont have access"}
                }else{
                    const user = await User.findByPk(decode.id)
                    if(!user){
                        throw {name: "You dont have access"}
                    }
                    else if(user.role !== 'admin'){
                        throw {name: "You dont have access"}
                    }
                    else{
                        req.userLogin = decode
                        next()
                    }
                }
            }
            
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Auth