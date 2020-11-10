function errorHandler(err,req,res,next){
  // console.log(err, '<<<<<<<<<<<< sumpah balak banget parah')
  let message = err.message || 'Server Internal Error'
  let statusCode = err.response || 500
  let errors = []
  
  if (err.name === "Unauthorized"){
    message = err.msg
    statusCode = 401
  }
  
  else if (err.name === "Bad Request"){
    message = err.msg
    statusCode = 400
  }


  else if (err.name === "SequelizeValidationError"){
    message = err.errors.map(element =>{
      errors.push(element.message)
    })
    statusCode = 400
    console.log(message,'<><><><><><><><><><><><>');
  }

  else if (err.name === "SequelizeUniqueConstraintError"){
    message = err.message + ", email already used"
  }

  else if (err.name === "JsonWebTokenError"){
    message = err.message + "user unauthenticated"
    statusCode = 401
  }
  console.log(err)
  res.status(statusCode).json({errors})
}

module.exports = errorHandler