'use strict'

function errorHandler (err,req,res,next){
  if(process.env.NODE_ENV == "development"){
    console.log(err);
  }
 
  let status = err.status
  let msg = err.msg
  
  switch (err.name) {
    case "SequelizeValidationError":  
      let errors = err.errors.map(item=>{   
        return item[item.path] = item.message
      })
      res.status(400).json({msg: errors})      
      break;
    default:
      res.status(status).json({msg})
      break;
  }
}

module.exports = errorHandler