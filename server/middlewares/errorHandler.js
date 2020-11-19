module.exports = function (err, req, res, next) {
  let status = err.status || 500
  let msg = err.msg || 'Internal Server Error'
  if (err.name === 'SequelizeValidationError') {
    status = 400
    msg = err.errors[0].message
  }
  else if (err.name === 'SequelizeDatabaseError') {
    status = 400
    msg = err.errors[0].message
  }
  else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = 'Email must be unique'
  }
  res.status(status).json({
    msg
  })
}