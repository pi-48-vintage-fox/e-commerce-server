const {User} = require('../models/index');
const {token} = require('../helpers/jwt');
const {compare} = require('../helpers/bcrypt')

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

    static async login(req, res){
        try {
            const userLogin = {
                email: req.body.email,
                password: req.body.password
            }

            const find = await User.findOne({
                where: {
                    email: userLogin.email
                }
            })

            const comparePassword = compare(userLogin.password, find.password);

            if (!find || !comparePassword) {
                res.status(401).json({
                    msg: "Email atau password salah"
                })
            } else {
                const access_token = token({
                    id: find.id,
                    email: find.email
                })

                res.status(200).json({access_token});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;