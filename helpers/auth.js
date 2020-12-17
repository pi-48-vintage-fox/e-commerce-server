const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = (password, saltRounds = 10) => {
  return bcrypt.hashSync(password, saltRounds)
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

function signToken(payload) {
  return jwt.sign(payload, 'secret')
}

function verifyToken(token) {
  return jwt.verify(token, 'secret')
}

function decodeToken(token) {
  return jwt.decode(token)
}

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
  decodeToken,
}
