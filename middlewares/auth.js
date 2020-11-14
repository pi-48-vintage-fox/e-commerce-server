'use strict'

const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token
    if(!access_token){
      throw { name : "Unauthorized", msg : 'unauthorized', status : 401 }
    }
    const decoded = verifyToken(access_token)
    const user = await User.findOne({
      where : {
        email : decoded.email
      }
    })
    if (!user){
      throw { name : "Unauthorized" ,msg : 'Email / Password salah', status : 401 }
    }
    else {
      req.loginUser = user
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function authorization(req, res, next) {
  const id = req.loginUser.id
  try {
    const user = await User.findByPk(id)
    if (user.role === "Admin"){
      next()
    }
    else {
      throw { name : "Unauthorized" , msg : "You're not Admin", status : 401}
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authentication,
  authorization
}