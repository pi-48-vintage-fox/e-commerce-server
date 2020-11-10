const {Product} = require('../models/index')

function authorization (req, res, next) {
    const id = req.params.id
    Product.findByPk(id)
    .then(data => {
        if(!data) { 
            let err = {
                name: 'Not Found'
            }
            throw err
        }
        else if(req.loggedInUser.role === 'admin'){
            console.log('authorized')
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