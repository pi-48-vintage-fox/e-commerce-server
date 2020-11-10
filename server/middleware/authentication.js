const { User } = require("../models/index")
const { decodedToken } = require("../helper/jwt")

function authentication (req, res, next) {

    if (!req.headers.access_token) {
        
        res.status(400).json({message: "access_token is required"})
    }  
    else {
    let token = decodedToken(req.headers.access_token)
        User.findOne({
            where: {
                email: token.email
            }
        })
        .then(result => {
    
            if (!result) {
                throw { message: "not Authentication", status: 404 }
            } else {
                req.isLogin = { id: token.id, email: token.email }
                next()
            }
        })
        .catch(err => {
            let message = err.message || "Internal Server Error"
            let status = err.status || 500
            res.status(status).json(message)
        })
    }

}

module.exports = authentication