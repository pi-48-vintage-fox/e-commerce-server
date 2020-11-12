function errorHandler(err, req, res, next) {
  let status = 500
  let message = err.message

  if(err.name == 'Authentication Failed') {
    res.status(400).json({message})
  } else if(err.errors[0].validatorKey == 'isUrl') {
    console.log(err);
    res.status(400).json({ message: 'Image must be format Url!'})
  } else if(err.errors[0].validatorKey == "notEmpty") {
    res.status(400).json({ message: "Field Cannot be empty!" })
  } else if(err.errors[0].validatorKey == 'isNumeric') {
    res.status(400).json({ message: "Incorret data type (string/number)"})
  } else if (err.errors[0].validatorKey == 'min') {
    res.status(400).json({ message: "Price or stock must be more than 0"})
  } else if(err.name == 'BadRequest') {
    res.status(400).json({message})
    console.log(err.name);
  } else if (err.name == 'NotFound') {
    res.status(404).json({message})
  } else if (err.name == "Authorization Failed") {
    res.status(401).json({message})
  } else {
    res.status(status).json({message: "Internal server error"})
  }
}

module.exports = errorHandler