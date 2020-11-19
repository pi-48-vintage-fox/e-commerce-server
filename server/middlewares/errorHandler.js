"use strict"
const errorHandler = (err, req, res, next) => {
  let status = 500
  let message = err.message

  switch (err.name) {
    case "SequelizeValidationError":
      status = 400
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400
      message = err.errors[0].message;
    case "BadRequest":
      status = 400
      messsage = "Invalid account"
      break;
    case "Unauthorized":
      status = 401
      message = "Wrong Email/ Password"
      break;
     case "JsonWebTokenError":
      status = 401
      message = "Failed to Authenticate"
      break;
    case "Forbidden":
      status = 403
      break;
    case "NotFound":
      status = 404
      break;
  }

  res.status(status).json({message})
}

module.exports = errorHandler