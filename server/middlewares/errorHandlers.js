'use strict'

module.exports = function (err, req, res, next) {
    switch (err.name) {
        case "SequelizeValidationError":
            let msg = []
            err.errors.forEach(el=> {
                if (el.validatorName === 'notEmpty') {
                    msg.push(err.errors[0].message)
                    msg.push(err.errors[1].message)
                    msg.push(err.errors[2].message)
                    msg.push(err.errors[3].message)
                    msg.push(err.errors[4].message)
                    res.status(400).json({ message: msg })
                } else if (el.validatorName === 'min') {
                    msg.push(err.errors[0].message)
                    msg.push(err.errors[1].message)
                    res.status(400).json({ message: msg })
                } else if (el.validatorName === 'isNumeric') {
                    msg.push(err.errors[0].message)
                    msg.push(err.errors[1].message)
                    res.status(400).json({ message: msg })
                }

            })
            break
        case "Empty email/password":
            res.status(401).json({ message: "Email and password must be filled." })
            break
        case 'Wrong Email and Password':
            res.status(401).json({ message: "Email/password is wrong." })
            break
        case "JsonWebTokenError":
            if (err.message === 'jwt must be provided') {
                res.status(401).json({ message: "Access token is empty." })
       }
            break
        case "Cannot access":
            res.status(403).json({ message: "You cannot access." })
            break
        default:
            res.status(500).json(err)
    }
}