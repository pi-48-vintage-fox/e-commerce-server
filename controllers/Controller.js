const { User, Product, Order } = require("../models/index");
const { generateHashPassword, verifPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: generateHashPassword(req.body.password),
        image: req.body.image || null,
        role: "customer",
      };
      const user = await User.create(data, { returning: true });
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      });
    } catch (err) {
      // console.log(err)
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await User.findOne({
        where: {
          email: dataUser.email,
        },
      });
      
      if (!user) {
        next({ name: "Unauthorized", msg: "Email or Password wrong" });
        return;
      }
      
      // console.log(user.password)
      // console.log(dataUser.password, "<<<<<,", user.password)
      const checkPassword = verifPassword(dataUser.password, user.password);
      // console.log(checkPassword)
      if (!checkPassword) {
        next({ name: "Unauthorized", msg: "Email or Password wrong" });
        return;
      }

      const access_token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });

      res.status(200).json({ access_token, name: user.name });
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res, next) {}
}

module.exports = Controller;
