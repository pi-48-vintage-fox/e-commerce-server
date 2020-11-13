const { Checkout } = require('../models/index')

class ChekoutController {
  static async addCheckout(req, res) {
    const checkout = {
      name: req.body.name,
      address: req.body.address,
      UserId: req.userLogin.id,
      ProductId: req.body.ProductId,
      qty: req.body.qty
    }

    try {
      const addCheckout = await Checkout.create(checkout);
      res.send(201).json(addCheckout);
    } catch (error) {
      console.log(error);
      res.send(500).json(error);
    }
  }
}

module.exports = ChekoutController