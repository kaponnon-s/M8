const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-unused-vars
const { BasicStrategy } = require("passport-http");

const { privateKey, publicKey } = require("../../../config/key");
const { users } = require("../../../repositories/index");

module.exports = {
	login: [
		"login",
		new BasicStrategy(async (username, password, done) => {
			try {
				const user = await users.getUser(username, password);
				console.log(user);
				done(null, user);
			} catch (err) {
				done(err);
			}
		}),
	],

	forget: [
		"forget",
		new BasicStrategy(async (username, password, done) => {
			try {
				done(null, "checkPass");
			} catch (err) {
				done(err);
			}
		}),
	],
};