function errorHendler(err, req, res, next) {

    console.log(err);

    let status = 500
    let msg = "Internal Server Error"

    if (err.name === "SequelizeValidationError") {
        status = 400
        msg = err.message    
    } else if (err.message) {
        status = 401
        msg = err.message
    }

    res.status(status).json(msg)
}

module.exports = errorHendler