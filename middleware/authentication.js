const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models/index')

function authentication (req, res, next) {
    const { access_token } = req.headers
    if(!access_token){
        let err = {
            name: 'Authentication failed'
        }
        throw next(err)
    }
    else{
        const decoded = verifyToken(access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if(!user){
                let err = {
                    name: 'Authentication failed'
                }
                throw next(err)
            }
            else{
                req.loggedInUser = decoded
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = authentication