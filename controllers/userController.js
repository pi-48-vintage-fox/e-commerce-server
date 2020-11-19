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
        var access_token = jwt.sign({id:loginUser.id, email:loginUser.email, role:loginUser.role}, process.env.SECRET)
        res.status(200).json({access_token, name:loginUser.name, profpic:loginUser.profpic,role:loginUser.role})
      }
      else{
        next({name:'Password / Email are wrong'})
      }
    } catch (error) {
      next (error)
    }
  }

  static async registerUser (req,res,next){
    try {
      let params = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: 'user'
      }
      let registerUser = await User.create(params)
      let access_token = jwt.sign({id:registerUser.id, email:registerUser.email, role:registerUser.role}, process.env.SECRET)
      res.status(201).json({access_token, name:registerUser.name, profpic:registerUser.profpic,role:registerUser.role})
    } catch (error) {
      next (error)
    }
  }
}