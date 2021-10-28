/* eslint-disable object-curly-newline */
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../repositories");
const { privateKey } = require("../config/key");

module.exports = {
	register: async (req, res, next) => {
		const {
			username,
			email,
			name,
			gender,
			age,
			height,
			weight,
			congenitalDisease,
			phone,
		} = req.body;

		let { password } = req.body;

		password = await bcrypt.hash(password, 10);

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

	login: (req, res, next) => {
		passport.authenticate("login", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res.status(200).json({
					message: "Login success..",
					token: jwt.sign({ ...user, provider: "นนท์เอง" }, privateKey, {
						algorithm: "RS256",
					}),
				});
			}

			return res.status(422).json(info);
		})(req, res, next);
	},

	showUser: (req, res, next) => {
		passport.authenticate("jwt", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res.status(200).json({
					message: "Login success..",
					data: user,
				});
			}

			return res.status(422).json(info);
		})(req, res, next);
	},

	loginFacebook: passport.authenticate("facebook"),

	callbackFacebook: (req, res, next) => {
		passport.authenticate("facebook", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				// eslint-disable-next-line no-unused-vars
				const { id, displayName, photos, provider } = user;

				return res.status(200).redirect(
					`http://localhost:3000/login/${jwt.sign(
						{
							id,
							displayName,
							photos,
							provider,
						},
						privateKey,
						{ algorithm: "RS256" }
					)}`
				);
			}

			return res.status(422).json(info);
		})(req, res, next);
	},

	loginGoogle: passport.authenticate("google", {
		scope: ["https://www.googleapis.com/auth/plus.login"],
	}),

	callbackGoogle: (req, res, next) => {
		passport.authenticate("google", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				const { id, displayName, photos, provider } = user;

				return res.status(200).redirect(
					`http://localhost:3000/login/${jwt.sign(
						{
							id,
							displayName,
							photos,
							provider,
						},
						privateKey,
						{ algorithm: "RS256" }
					)}`
				);
			}

			return res.status(422).json(info);
		})(req, res, next);
	},

	loginTwitter: passport.authenticate("twitter"),

	callbackTwitter: (req, res, next) => {
		passport.authenticate("twitter", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				const { id, displayName, photos, provider } = user;

				return res.status(200).redirect(
					`http://localhost:3000/login/${jwt.sign(
						{
							id,
							displayName,
							photos,
							provider,
						},
						privateKey,
						{ algorithm: "RS256" }
					)}`
				);
			}

			return res.status(422).json(info);
		})(req, res, next);
	},
};
