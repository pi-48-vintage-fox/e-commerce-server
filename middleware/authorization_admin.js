const {User} = require('../models/index')

function authorization (req, res, next) {
   
    User.findOne({
        where: {
            email: req.loggedInUser.email
        }
    })
    .then(data => {
        if(data && req.loggedInUser.role == 'admin'){
            console.log('authorized as admin')
            next()
        }
        else{
            let err = {
                name: 'Authentication failed'
            }
            throw next(err)
        }
    })
    .catch(err => {
        next(err)
    })

}

module.exports = authorization