const jwt = require('jsonwebtoken')

function signToken(params) {
  const token = jwt.sign(params, process.env.SECRET || 'rahasia')
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET || 'rahasia')
  return decoded
}

module.exports = {
  signToken,
  verifyToken
}

