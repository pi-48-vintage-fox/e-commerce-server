function errorHandler(err, req, res, next) {
    let status = err.status || 500
    let message = err.name || 'Internal Server Error'

    if(err.name === 'SequelizeValidationError'){
        status = 400
        message = err.errors[0].message
    } else if(err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        message = err.errors[0].message
    } else if (err.name === 'Authentication failed'){
        status = 401
        message = 'User unauthorized'
    } else if(err.name === 'UserUnauthorized'){
        status = 401
        message = 'User unauthorized'
    } else if (err.name === 'WrongEmailPassword'){
        status = 401
        message = 'Wrong email/password'
    } else if(err.name === 'JsonWebTokenError'){
        status = 401
        message = 'Wrong email/password'
    } else if(err.name === 'Not Found'){
        status = 404
        message = 'Error Not Found'
    }
    res.status(status).json({message})
}
  
  module.exports = errorHandler