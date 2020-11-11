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
                role: "admin"
            }
        })
        if(!user) return next({name: "Unauthorized", msg: "Token tidak ditemukan"})
        req.decoded = decoded
        next()
    } catch (err) {
        next(err)
    }

}

// perlu revisi **
async function authorization(req, res, next){
    try {
        const userId = req.decoded.id
        const id = +req.params.id

        if(!taskConj) {
            next({name: "Unauthorized", msg: "Data tidak ditemukan, tidak memiliki akses"})
        } 
        else if(taskConj.UserId !== userId) {
            next({name: "Unauthorized", msg: " tidak memiliki akses"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication, authorization}