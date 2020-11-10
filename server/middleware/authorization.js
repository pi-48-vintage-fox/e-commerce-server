const { User } = require("../models/index")

function authorization(req, res, next) {

    let idUser = req.isLogin.id

    User.findOne({
        where: {
            id: idUser
        }
    })
    .then(result => {
        if (!result) {
            throw { message: "not Authorization", status: 404 }
        } else if(result.role === "admin") {
            next()
        } else {
            throw { message: "not Authorization", status: 404 }
        }
    })
    .catch(err => {
        let message = err.message || "Internal Server Error"
        let status = err.status || 500
        res.status(status).json(message)
    })
}

module.exports = authorization