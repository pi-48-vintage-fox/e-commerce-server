function errorHandler(err, req, res, next) {
  let status = 500
  let message = err.message

  if(err.name == "SequelizeValidationError") {
    status = 400
    message = err.errors.map(el => {
      return el.message
    })
    res.status(status).json({ message })
  } else if(err.name == 'BadRequest') {
    res.status(400).json({ message })
    console.log(err.name);
  } else if(err.name == 'Unauthorized') {
    res.status(401).json({ message })
  } else if (err.name == 'NotFound') {
    res.status(404).json({ message })
  } else  {
    res.status(status).json({ message })
  }
}

module.exports = errorHandler