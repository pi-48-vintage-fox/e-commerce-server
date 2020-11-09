const { User } = require('../models')

const Authorization = (req, res, next) => {
	User.findByPk(req.userData.id)
		.then(user => {
			if (user) {
				if (user.role == 'admin') {
					next();
				} else {
					res.status(401).json({ message: "Failed to Authenticate, Not an Admin" });
				}
			} else {
				res.status(404).json({ message: "User not found" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};

module.exports = Authorization