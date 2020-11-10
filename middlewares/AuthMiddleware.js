'use strict'

const { decodeToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token
    if (!access_token) throw { msg: "Not Authorized", status: 401 }

    let decoded = decodeToken(access_token)
    let user = await User.findOne({
      where: {
        email: decoded.email
      }
    })
    if (!user) throw { msg: "Not Authenticated", status: 401 }
    

  } catch (err) {
    next(err)
  }

}

module.exports = {
  authtentication
}