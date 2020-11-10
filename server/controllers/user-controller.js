const { User } = require("../models/index")
const { comparePassword } = require("../helper/bcrypt")
const { createdToken } = require("../helper/jwt")

class UserController {
    static register(req, res) {
        let email = req.body.email
        let password = req.body.password

        let dataUser = {
            email, password, role: "user"
        }

        User.create(dataUser, {
            returning: true
        })
        .then(result => {
            let data = {id: result.id, email: result.email}
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
            where: {
                email
            }
        })
        .then(result => {
            if (!result) {
                throw { message: "Invalid Username/ Password", status: 401 }
            } else if (comparePassword(password, result.password)) {
                let token = createdToken({id: result.id, email: result.email})
                res.status(200).json({access_token: token})
            } else {
                throw { message: "Invalid Username/ Password", status: 401 }
            }
        })
        .catch(err => {
            let message = err.message || "Internal Server Error"
            let status = err.status || 500
            res.status(status).json(message)
        })
    }
}

module.exports = UserController