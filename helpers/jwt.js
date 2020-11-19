const jwt = require("jsonwebtoken");

function generateToken(data) {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
}

module.exports = { generateToken, verifyToken };
