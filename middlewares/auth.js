const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
  const access_token = req.headers.access_token

  if(access_token){
    const decode = jwt.verify(access_token,process.env.SECRET)
    req.userData = decode
    User.findByPk(req.userData.id)
      .then(user=>{
        if(!user){
          return res.status(400).json({msg:'You dont have valid authentication'})
        }
        else if (user && decode.role == 'user'){
          return res.status(400).json({msg:'You cannot do this action'})
        }
        else{
          next()
        }
      })
      .catch(err=>{
        res.status(500).json({msg:"Internal Server Error"})
      })
  }else{
    res.status(401).json({msg:'Please Login or Register to continue'})
  }
}

const authorization = (req,res,next)=>{
  const {id} = req.params
  const userData = req.userData.id

  Product.findByPk(id)
    .then(dataProduct=>{
        if(!dataProduct){
            res.status(404).json({msg:'Ensure your product detail is correct'})
        }else if (userData !== dataProduct.UserId){
            res.status(403).json({msg:'You dont have right to do that action'})
        }
        else{
            next()
        }
    })
    .catch(err=>{
        res.status(500).json({msg:err.message})
    })
}

module.exports = {
  authentication,
  authorization
}