'use strict'

const { decodeToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token
    if (!access_token) throw { msg: "Not Authenticated", status: 401 }

    let token = decodeToken(access_token)
    let user = await User.findOne({
      where: {
        email: token.email
      }
    })
    if (!user) throw { msg: "Not Authenticated", status: 401 }
    if (user.role != "admin") throw { msg: "Not Authenticated", status: 401}

    req.loggedInUser = user
    next()


  } catch (err) {
    next(err)
  }

}

module.exports = {
  authentication
}