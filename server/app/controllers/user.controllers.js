/* eslint-disable object-curly-newline */
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

		// const newUser = await users.register(user, userDetail);
		const newUser = await users.regisTest(user);

		if (newUser.error) {
			res.status(402).json({ message: "fail", data: newUser.error });
		}

		res.status(200).json({ message: "success", data: newUser });
		next();
	},

	// eslint-disable-next-line no-unused-vars
	sendEmail: async (req, res, next) => {
		const { email } = req.body;

		const user = await users.checkEmail(email);

		if (user.error) {
			res.status(404).json(user.message);
		}

		const token = jwt.sign(user, privateKey, { algorithm: "RS256" });

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: "kaphonnon.s@gmail.com",
				pass: "22525440",
			},
		});

		const mailOptions = {
			// eslint-disable-next-line quotes
			from: '"Avo Authenticate 👻" <kaphonnon.s@gmail.com>',
			to: user.email,
			subject: "Reset password for Avo",
			text: "Reset password",
			html: `<a href="http://localhost:3000/reset-password/${token} ">Click link for reset</a>`,
		};

		// eslint-disable-next-line no-unused-vars
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.status(422).json({ error: true, message: error.message });
			}

			res.status(200).json({ message: "success" });
		});
	},

	login: (req, res, next) => {
		passport.authenticate("login", async (err, user, info) => {
			if (err) return next(err);

			if (user) {
				if (user.error) res.status(402).json(user);
				res.status(200).json({
					message: "Login success..",
					token: jwt.sign(
						{ ...user, provider: "นนท์เอง" },
						privateKey,
						{
							algorithm: "RS256",
						}
					),
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
	setPassword: (req, res, next) => {
		passport.authenticate("jwt", async (err, user, info) => {
			if (err) return next(err);

			const { password } = req.body;

			if (user) {
				try {
					await users.setPassword(user.id, password);
					res.status(200).json({
						message: "Password was changed..",
					});
				} catch (error) {
					res.status(500).json(error);
				}
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
