const passport = require("passport");
const { users } = require("../repositories");

module.exports = {
	login: (req, res, next) => {
		passport.authenticate("login", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res
					.status(200)
					.json({ message: "Login success..", user });
			}

			return res.status(422).json(info);
		})(req, res, next);
	},
	register: async (req, res, next) => {
		const {
			username,
			password,
			email,
			name,
			gender,
			age,
			height,
			weight,
			congenitalDisease,
			phone,
		} = req.body;

		const user = { username, password, email };

		const userDetail = {
			name,
			gender,
			age,
			height,
			weight,
			congenital_disease: congenitalDisease,
			phone,
		};

		const newUser = await users.register(user, userDetail);

		if (newUser.error) {
			res.status(402).json({ message: "fail", data: newUser.error });
		}

		res.status(200).json({ message: "success", data: newUser });
		next();
	},
};
