const {User} = require('../models/index')
const {hashPassword, comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class UserControllers {

    static register (req, res, next) {
        const payload = {
            email: req.body.email,
            password: hashPassword(req.body.password),
            role: req.body.role || 'customer'
        }
        User.create(payload)
        .then(user => {
            let data = {
                id: user.id,
                email: user.email
            }
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    
    static loginUser (req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(user => {
            if(!user){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else if(!comparePassword(payload.password, user.password)){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else{
                let data = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
                let access_token = signToken(data)
                res.status(200).json({access_token})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserControllers