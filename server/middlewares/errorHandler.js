function errorHandler (err, req, res, next){
    let status = 500
    let msg = err.name || 'Internal Server Error'

    if(err.name === 'SequelizeValidationError'){
        status = 401
        msg = err.errors[0].message
    }
    else if(err.name === 'Not Found'){
        status = 404
        msg = 'Not Found'
    }
    else if (err.name === 'Authentication failed'){
        status = 401
        msg = 'Wrong email or password'
    }
    else if(err.name = 'Unauthorized'){
        status = 401
        msg = 'You are unauthorized'
    }
    console.log(err)
    res.status(status).json({msg})
}

module.exports = errorHandler 