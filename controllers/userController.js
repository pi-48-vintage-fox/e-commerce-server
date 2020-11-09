const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
	static login(req, res, next) {
		const userData = {
			email: req.body.email,
			password: req.body.password,
		};

		if (!userData.email || !userData.password) {
			return next({
				name: "BadRequest",
				message: "Must Enter Email and Password",
			});
		}

		User.findOne({ where: { email: userData.email } })
			.then((result) => {
				if (!result || !comparePass(userData.password, result.password)) {
					next({
						name: "Unauthorized",
						message: "Wrong Email/Password",
					});
				} else {
					res.status(201).json({
						access_token: signToken({
							id: result.id,
							email: result.email,
							role: result.role,
						}),
						display_name: result.display_name,
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = UserController