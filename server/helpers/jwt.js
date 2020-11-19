'use strict'
const jwt = require('jsonwebtoken')

const signToken = (input => {
    return jwt.sign(input, process.env.SECRET)
})
const verifyToken = (token => {
    return jwt.verify(token, process.env.SECRET)
})

module.exports = {
    signToken,
    verifyToken
}