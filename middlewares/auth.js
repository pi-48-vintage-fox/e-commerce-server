const {User, Product, Order} = require('../models/index');
const {verifyToken} = require('../helpers/jwt');

async function authentication(req, res, next){
    const access_token = req.headers.access_token
    try {
        if(!access_token) return next({name: "Unauthorized", msg: "Token tidak ditemukan"})
        const decoded = verifyToken(access_token)
        const user = await User.findOne({
            where: {
                email: decoded.email,
            }
        })
        // console.log(user, 'ini user')
        if(user == null) return next({name: "Unauthorized", msg: "Tidak memiliki akses"})
        req.decoded = decoded
        next()
    } catch (err) {
        next(err)
    }

}

async function authorization(req, res, next){
    try {
        console.log(req.decoded.role, "<<<<<")
        const userId = req.decoded.id
        const id = +req.params.id
        const role = req.decoded.role

        const user = await User.findOne({
            where: {
                email: req.decoded.email
            }
        })
        console.log(user.role, '<< user.role')
        if(!user) {
            next({name: "Unauthorized", msg: "Data tidak ditemukan, tidak memiliki akses"})
        } else if (user.role.toLowerCase() == 'customer') {
            next({name: "Unauthorized", msg: " tidak memiliki akses"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function authorizationClient(req, res, next){
    try {
        const UserId = req.decoded.id
        const id = +req.params.id
        const role = req.decoded.role

        const user = await User.findOne({
            where: {
                email: req.decoded.email
            }
        })

        if(!user) {
            next({name: "Unauthorized", msg: "Data tidak ditemukan, tidak memiliki akses"})
        } else if (user.role.toLowerCase() == 'admin') {
            next({name: "Unauthorized", msg: " tidak memiliki akses"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication, authorization, authorizationClient}