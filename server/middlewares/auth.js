const { verifyToken } = require('../helpers/jsonwebtoken')
const { User, Cart } = require('../models')

module.exports = {
  authentication:  async (req, res, next) => {
    
    const {access_token} = req.headers

    try {
      if(access_token){
          const decoded = verifyToken(access_token)

          const user = await User.findOne({
            where: {
              id: decoded.id
            }
          })
          if(user) {
            req.loggedInUser = decoded
            return next()
          }
          else {

            throw {name: 'Authentication failed', msg: 'You have to register first', status: 401}

          }
      } else {

        throw {name: 'Authentication failed', msg: 'You have to login first', status: 401}
       
      }

    } catch (err) {
        next(err)
    }
  },
  authorization: async (req, res, next) => {

    const id = req.loggedInUser.id
    
    try {

      const user = await User.findByPk(id)
      if(user.role === 'admin') {
        next()
      } else {
        throw { name: 'Authorization failed', msg: `You don't have authorization to access this data`, status: 401}
        
      }
    } catch (error) {
      next(error)
    }
  },
  authorizationCustomer: async (req, res, next) => {

    const id = +req.loggedInUser.id
    console.log(req.loggedInUser, 'dsfsdfd')
   try {
      const user = await User.findByPk(id)
      const cart = await Cart.findOne({
        where: {
          UserId: id
        }
      })
      if(user.role === 'customer' && user.id === cart.UserId) {
        next()
      } else {
        throw { name: 'Authorization failed', msg: `You don't have authorization to access this data`, status: 401}
        
      }
    } catch (error) {
      next(error)
    }
  }
  
}