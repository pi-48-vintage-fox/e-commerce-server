'use strict'
const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = (req, res, next)=> {
    const decoded = verifyToken(req.headers.access_token)
    User.findOne({
        where:{
            email:decoded.email
        }
    })
    .then(data=> {
        if (data.email !== 'admin@mail.com') {
            throw (err)
        }
        else {
            req.userData = data
            next()
        }
    })
    .catch (err=> {
        next({name: 'Cannot access'})
    }) 
}

module.exports = authentication