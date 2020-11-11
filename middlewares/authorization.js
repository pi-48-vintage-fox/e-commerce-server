const { Product } = require('../models/index')

async function authorization(req, res, next) {
    const { id } = req.params
    try {
        const data = await Product.findByPk(id)
        if(!data) {
            throw { name: `Data's Not Found`, status: 404 }
        } else if(data.UserId === req.loggedIn.id) {
            next()
        } else {
            console.log(req.loggedIn, data);
            throw { name: 'Not Authorized', status: 401 }
        }
    } catch (err) {
        // const status = err.status || 500
        // const message = err.message || 'Internal Server Error'
        // res.status(status).json({ err: message })
        next(err)
    }
    
}

module.exports = authorization