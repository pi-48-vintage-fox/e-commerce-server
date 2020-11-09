function errorHandler(err,req,res,next){
  let message = err.message || 'Server Internal Error'
  let statusCode = err.response || 500
  
  if (err.name === "Unauthorized"){
    message = err.message
    statusCode = 401
  }
  else if (err.name === "SequelizeValidationError"){
    message = err.errors.map(element =>{
      return " " + element.message
    })
  }
  else if (err.name === "SequelizeUniqueConstraintError"){
    message = err.message + ", email already used"
  }
  console.log(err)
  res.status(statusCode).json({message})
}

module.exports = errorHandler