'use strict'
const jsonwebtoken = require('jsonwebtoken')

function signToken(payload){
  const token = jsonwebtoken.sign(payload, 'rahasia')
  return token
}

function verifyToken(token){
  const decoded = jsonwebtoken.verify(token, 'rahasia')
  return decoded
}

module.exports = {
  signToken,
  verifyToken
}