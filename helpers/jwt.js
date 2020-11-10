'use strict'

const jsonwebtoken = require('jsonwebtoken');

function signToken(payload){
  return jsonwebtoken.sign(payload,process.env.JWT_SECRET || "y4r@h4SI@jy@")
}

function decodeToken(payload){
  return jsonwebtoken.decode(payload)
}

module.exports = {
  signToken,
  decodeToken
}