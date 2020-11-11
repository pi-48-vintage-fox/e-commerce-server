const { User } = require('../models/index')

async function authorization(req, res, next) {
  let id = +req.loggedInUser.id
  try {
    const user = await User.findByPk(+id)
    if (user.role == 'admin') {
     return next()
    } else {
      throw {name: "Authorization Failed", message: "You don't have authorization!", status: 401}
    }
  }
  catch(err) {
    next(err)
  }
}

module.exports = authorization