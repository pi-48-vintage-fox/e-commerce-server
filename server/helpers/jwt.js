const jwt = require('jsonwebtoken')

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET || 'mysecret')

  return token
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET || 'mysecret')

  return decoded
}

module.exports = {
  signToken,
  verifyToken
}