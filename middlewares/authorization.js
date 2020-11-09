const { User } = require('../models')

const Authorization = (req, res, next) => {
	User.findByPk(req.userData.id)
		.then((result) => {
			if (result.role == "admin") {
				next();
			} else {
				res.status(401).json({ message: "Failed to Authenticate, Not an Admin" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};

module.exports = Authorization