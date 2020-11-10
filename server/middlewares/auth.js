const { verifyToken } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

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

            res.status(401).json({msg: 'You have to register first'})
    
          }
      } else {
        res.status(401).json({msg: 'You have to login first'})
      }

    } catch (err) {
        res.status(500).json({err})
    }
  },
  authorization: async (req, res, next) => {

    const id = req.loggedInUser.id
    
    try {

      const user = await User.findByPk(id)
      if(user.role === 'admin') {
        next()
      } else {

        return res.status(401).json({msg: `You don't have authorization to access this data`})
      }
    } catch (error) {
      return res.status(500).json({err})
    }
  }
}