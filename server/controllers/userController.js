const { User } = require('../models')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')

class userController {

  static login(req, res, next){

    const { email, password } = req.body
    console.log(password, email);
    
    const userObj = {
      email,
      password
    }  
    if(email === '' || password === ''){
      throw {name: 'login failed', msg: 'you should input something to the field', status: 400}
    }
    else {
      User.findOne({
        where: {
          email: userObj.email,
        }
      })
        .then(user => {
          if(!user){
            throw {name: 'login failed', msg: 'invalid email or password', status: 401}
          }
          else if(!comparePassword(password, user.password)){
            console.log(user.password);
            throw {name: 'login failed', msg: 'invalid email or password', status: 401}
          }
          else if(comparePassword(password, user.password)){
            const token = generateToken({
              id: user.id,
              email: user.email,
              
            })
            const username = user.email.split('@')[0]
            res.status(200).json({
              access_token: token,
              username: username
            })
          }  
        })
        .catch(err => {
            next(err)
        })
    }  
  }
  static register (req, res, next){
    const { email, password } = req.body
    const newUser = {
      email,
      password
    }
    User.create(newUser)
      .then(data => {
        res.status(201).json({user: data})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = userController