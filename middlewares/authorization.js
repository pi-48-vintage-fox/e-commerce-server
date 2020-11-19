const {Cart} = require('../models/index');
async function authorization(req, res, next) {
    try {
        if (req.userLogin.role === 'admin') {
            next()
        } else {
            next({
                name: 'unauthorized'
            });
        }
    } catch (error) {
        next(error);
    }
}

async function authorizationCart(req, res, next) {
    console.log(req.userLogin.id);
    try {
        const find = await Cart.findOne({
            where: {
                UserId: +req.userLogin.id,
                ProductId: +req.params.id
            }
        })
        if (find) {
            next()
        } else {
            next({
                name: 'not found'
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {authorization, authorizationCart};