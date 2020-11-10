const {User} = require("../models/")
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {
    static async login(req,res,next){
        try {
            const {email,password} = req.body
            if(!email || !password){
                throw {name : 'Email and Password cannot be empty'}
            }
            else{
                const userdata = await User.findOne({
                    where:{email}
                })
                if(userdata){
                    const pass = await bcrypt.compare(password, userdata.password)
                    if(pass){
                        const access_token = jwt.signToken({id:userdata.id,email:userdata.email,role:userdata.role})
                        res.status(200).json({access_token, id:userdata.id,email:userdata.email,role:userdata.role})
                    }else{
                        throw {name : 'Invalid email or password'}
                    }
                }else{
                    throw {name : 'Invalid email or password'}
                }
            }
        } catch (error) {
            next(error)
        }
        
    }

}

module.exports = UserController