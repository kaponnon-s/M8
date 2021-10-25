const passport = require("passport");
// const users = require("../repositories");

module.exports = {
	login: (req, res, next) => {
		passport.authenticate("login", (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res.json({ message: "Login success..", user });
			}

			return res.status(422).json(info);
		})(req, res, next);
	},
};
