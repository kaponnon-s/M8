const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const { privateKey } = require("../../../config/key");

module.exports = {
	jwt: [
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: privateKey,
				algorithms: ["RS256"],
			},
			(payload, done) => {
				if (payload) {
					done(null, payload);
				} else done(null, false, { message: "Not found user." });
			}
		),
	],
};
