'use strict'
const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = (req, res, next)=> {
    const decoded = verifyToken(req.headers.access_token)
    console.log(decoded)
    User.findOne({
        where:{
            email:decoded.email
        }
    })
    .then(data=> {
            req.userData = data
            next()
    })
    .catch (err=> {
       res.status(500).json(err)
    }) 
}

module.exports = authentication