class ErrorHandler {

  static errorHandler(err, req, res, next) {
    let statusCode = 500
    let errors = []
    if (err.name === "SequelizeValidationError") {
      err.errors.map(elem => {
        errors.push(elem.message)
      })
      statusCode = 400
    } else if (err.name === "JsonWebTokenError") {
      errors.push(err.message)
      statusCode = 400
    } else {
      errors.push(err.message || "internal server errors")
      statusCode = err.statusCode || 500
    }

    res.status(statusCode).json({
      errors
    })
  }

}

module.exports = ErrorHandler