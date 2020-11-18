const {User} = require('../models/index');
const {token} = require('../helpers/jwt');
const {compare} = require('../helpers/bcrypt')

class UserController {
    static async register(req, res, next){
        try {
            const userRegis = {
                email: req.body.email,
                password: req.body.password
            }

            const addUser = await User.create(userRegis);
            res.status(201).json({
                id: addUser.id,
                email: addUser.email,
                role: addUser.role
            }) 

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next){
        try {
            const userLogin = {
                email: req.body.email,
                password: req.body.password
            }

            console.log(userLogin);

            const find = await User.findOne({
                where: {
                    email: userLogin.email
                }
            })

            console.log(find);

            const comparePassword = compare(userLogin.password, find.password);

            if (!find || !comparePassword) {
                res.status(401).json({
                    msg: "Email atau password salah"
                })
            } else {
                const access_token = token({
                    id: find.id,
                    email: find.email,
                    role: find.role
                })
                res.status(200).json({access_token, role: find.role});
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteUser(req, res, next){
        try {
            const deleteUser = await User.destroy({
                where: {
                    id: +req.params.id
                }
            });
            if (deleteUser) {
                res.status(200).json({
                    message: 'Succes delete user'
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;