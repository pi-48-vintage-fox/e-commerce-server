const { VerifyToken } = require('../helpers/jwt')
const {User} = require('../models/index')

async function AuthenticateCust(req,res,next){
    try{
        const { access_token } = req.headers
        if(!access_token){
            res.status(401).json({
                message: "Do not Have Access"
            })
        }else{
            const decoded = VerifyToken(access_token)
            const user = await User.findOne({
                where:{
                    email: decoded.email,
                    role: "Customer"
                }
            })
            if(!user){
                res.status(404).json({msg: "Id Not Found"})
            }else{
                req.decoded = decoded
                next()
            }
        }
    }catch(error){
      next(error)
    }
}

module.exports = AuthenticateCust