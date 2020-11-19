'use strict'

const bcrypt = require('bcrypt');


function makeHash(payload){
  return bcrypt.hashSync(payload, +process.env.SALT || 10)
}

function compareHash(payload,hashedPayload){
  return bcrypt.compareSync(payload,hashedPayload)
}

module.exports = {
  makeHash,
  compareHash
}