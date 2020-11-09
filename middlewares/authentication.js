const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt');

const Authentication = (req, res, next) => {
    const { access_token } = req.headers
    if (access_token) {
        req.userData = verifyToken(access_token)
        User.findByPk(req.userData.id)
            .then(user => {
                if (!user) {
                    let err = {
                        msg: 'Not Authenticate'
                    }
                    throw err
                } else {
                    return next()
                }
            })
            .catch(err => {
                return next(err)
            })
    } else {
        return next(err)
    }
}

module.exports = Authentication