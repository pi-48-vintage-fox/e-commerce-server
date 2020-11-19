const jwt = require('jsonwebtoken');

function token(user) {
    const token = jwt.sign(user, process.env.SECRET);
    return token;
}

function verify(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
}

module.exports = {token, verify}