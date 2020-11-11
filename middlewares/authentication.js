const {verify} = require('../helpers/jwt')
const {User} = require('../models/index')

function authentication(req, res, next) {
    const access_token = req.headers.access_token;

    const decoded = verify(access_token);
    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then(data => {
        if (!data) {
            next('Authentication failed');
        } else {
            req.userLogin = decoded
            next()
        }
    })
    .catch(err => {
        next(err);
    })
}

module.exports = authentication;