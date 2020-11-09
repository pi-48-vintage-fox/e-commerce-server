const {Admin} = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class AdminControllers {
    
    static loginAdmin (req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        Admin.findOne({
            where: {
                email: payload.email
            }
        })
        .then(admin => {
            if(!admin){
                let err = {
                    msg: 'Wrong email/password'
                }
                throw next(err)
            }
            else if(!comparePassword(payload.password, admin.password)){
                let err = {
                    msg: 'Wrong email/password'
                }
                throw next(err)
            }
            else{
                let data = {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role
                }
                let access_token = signToken(data)
                res.status(200).json({access_token, role})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = AdminControllers