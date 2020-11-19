function errorHandlers(err, req, res, next) {
  // console.log(err, "ini dr error handlers");
  let errorMsg = err.message || "server internal error";
  let status = err.status || 500;
  if (err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError" || err.name == "SequelizeDatabaseError") {
    errorMsg = err.errors[0].message;
    status = 400;
  } else if (err.name == "Unauthorized") {
    errorMsg = err.msg;
    status = 401;
  }
  res.status(status).json({ errorMsg });
}

module.exports = errorHandlers;
