const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')

class userController {

  static login(req, res){

    const { email, password } = req.body

    const userObj = {
      email,
      password
    }
    if(email === '' || password === ''){
      res.status(400).json({msg: 'you should input something to the field'})
    }
    else {
      User.findOne({
        where: {
          email: userObj.email,
        }
      })
        .then(user => {
  
          if(!user){
            res.status(401).json({msg : 'invalid email or password'})
          }
          else if(!comparePassword(password, user.password)){
            res.status(401).json({msg : 'invalid email or password'})
          }
          else if(comparePassword(password, user.password)){
            const token = generateToken({
              id: user.id,
              email: user.email,
              
            })
            res.status(200).json({access_token: token})
          }
          
        })
        .catch(err => {
         
      
            res.status(500).json({err})
        
          
        })
    }

    
  }
}

module.exports = userController