const jwt = require("jsonwebtoken")

function signToken(payload){
    const token = jwt.sign(payload,'inisecretjsonwebtoken')
    return token
}
function verifyToken(token){
    const decoded = jwt.verify(token,'inisecretjsonwebtoken')
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}