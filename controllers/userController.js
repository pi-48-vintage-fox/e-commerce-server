const {User} = require('../models/')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

module.exports = class userController{
  static async login(req,res,next){
    try {
      let params ={
        email:req.body.email,
        password:req.body.password
      }
      let loginUser = await User.findOne({where:{email:params.email}})
      if(loginUser && bcrypt.compareSync(params.password,loginUser.password)){
        var access_token = jwt.sign({id:loginUser.id, email:loginUser.email}, process.env.SECRET)
        res.status(200).json({access_token, name:loginUser.name, profpic:loginUser.profpic,role:loginUser.role})
      }
      else{
        next({name:'Password / Email are wrong'})
      }
    } catch (error) {
      next (error)
    }
  }
}