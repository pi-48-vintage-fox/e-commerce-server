const {verifyToken} = require('../helpers/jwt')
const {Admin} = require('../models/index')

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
        Admin.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(Admin => {
            if(!Admin){
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