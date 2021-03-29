function errorHandler (err, req, res, next) {

  let msg = 'Internal Server Error'
  let status = 500

  if(err.name.includes('Sequelize')){
    
    
    if(err.errors[0].validatorName === 'notEmpty'){
      console.log(err.name, 'ini do product controller');
      //console.log(err);
      msg = 'please fill in the field'
    }
    if(err.errors[0].validatorName === 'min'){
      //console.log();
      msg = 'price or stock must greater than 0'    
    }
    if(err.errors[0].validatorName == 'isNumeric'){
      msg = 'price or stock must be number'
    }
    status = 400
    
    
  }

  switch (err.name) {
    case 'Authentication failed':
      msg = err.msg
      status = err.status
      break;
    case 'Authorization failed':
      msg = err.msg
      status = err.status
      break;
    case 'login failed':
      msg = err.msg
      status = err.status
      break
  }
  console.log(err);
  
  res.status(status).json({msg: msg})
}
module.exports = errorHandler