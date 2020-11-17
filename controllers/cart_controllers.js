const {Cart} = require('../models/index')

class CartController {
    static viewCart (req, res, next) {
        Cart.findAll()
    }

    static addToCard (req, res, next) {
        
    }
}

module.exports = CartController