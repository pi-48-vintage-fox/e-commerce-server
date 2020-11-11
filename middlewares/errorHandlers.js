function errorHandlers(err, req, res, next) {
  // console.log(err.name, "ini dr error handlers");
  let errorMsg = err.message || "server internal error";
  let status = err.status || 500;
  if (err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError" || err.name == "SequelizeDatabaseError") {
    // console.log(errorMsg, "ini di errorhandler")
    errorMsg = err.errors[0].message;
    status = 400;
  } else if (err.name == "Unauthorized") {
    errorMsg = err.msg;
    status = 401;
  }
  // else if (err.name == "SequelizeValidationError") {
  // message = err.errors.map((errors) => {
  //   return " " + errors.message;
  // });
  //   errorMsg = err.errors
  //   status = 400;
  // }
  
  // console.log(status, "<<>>", errorMsg)
  res.status(status).json({ errorMsg });
}

module.exports = errorHandlers;
