const jwt = require('jsonwebtoken')

function generateToken (payload){

  const token = jwt.sign(payload, 'inirahasianegara')

  return token
}

function verifyToken (token){

  const decoded = jwt.verify(token, 'inirahasianegara')

  return decoded

}

module.exports = {
  generateToken,
  verifyToken
}