const {User} = require('../models/index');

class UserController {
    static async register(req, res){
        try {
            const userRegis = {
                email: req.body.email,
                password: req.body.password
            }

            const addUser = await User.create(userRegis);
            res.status(201).json({
                id: addUser.id,
                email: addUser.email
            }) 

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;