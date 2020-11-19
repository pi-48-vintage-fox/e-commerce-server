let jwt = require('jsonwebtoken');

function createdToken(data) {
    let token = jwt.sign(data, process.env.SECRET);
    return token
}

function decodedToken(token) {
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports = {
    createdToken, decodedToken
}