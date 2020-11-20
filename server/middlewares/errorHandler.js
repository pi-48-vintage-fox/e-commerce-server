const errJoin = require('../helpers/errJoin');

module.exports = (err, req, res, next) => {
    const errName = err.name
    const errErrors = err.errors
    let message = 'Internal Server Error'
    let status = 500

    // * Default Sequelize Error Message
    const uniqueErr = `SequelizeUniqueConstraintError`
    const validationErr = `SequelizeValidationError`

    // * Custom Error Message
    const loginErr = `Invalid email or password`
    const loginEmpty = 'Email and Password cannot be empty'
    const productEmpty = 'Please fill all form'
    const outStock = 'Out of Stock'
    const minStock = 'You have reach minimum ammount to checkout'
    //Custom Auth Error Message
    const authErr = 'You dont have access'

    //Not Found
    const notFound = "Data Not Found"

    switch (errName) {
        case uniqueErr:
            message = errJoin(errErrors)
            status = 400
            break
        case validationErr:
            message = errJoin(errErrors)
            status = 400
            break
        case loginErr:
            message = loginErr
            status = 401
            break
        case loginEmpty:
            message = loginEmpty
            status = 401
            break
        case productEmpty:
            message = productEmpty
            status = 400
            break
        case outStock:
            message = outStock
            status = 400
            break
        case minStock:
            message = minStock
            status = 400
            break
        case authErr:
            message = authErr
            status = 403
            break
        case notFound:
            message = notFound
            status = 404
            break
    }

    res.status(status).json({ msg: message })
}